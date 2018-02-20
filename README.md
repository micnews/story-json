# story-json

`story-json` is a JavaScript Object Notation (JSON) platform-agnostic document format that describes interactive content that user can "tap" through. This is an interactive storytelling format, optimized for quick consumption on a smartphone or tablet. See an example [here](https://mic.com/stories/327/what-happens-in-your-brain-when-you-listen-to-music).

A "Story" consists of a set of pages (or slides). Each page can contain various kinds of content. In most cases a page will have an image or short video as a background, with elements overlayed on top. Story-JSON documents can be created once and then transformed into any supported target format. This is based on the AMP Project's design system for Stories, which you can find [here](https://www.ampproject.org/docs/tutorials/visual_story/parts_of_story).

Story-JSON exists because we expect the Story format will be adopted by more and more platforms over time. Story-JSON serves as a convenient base format from which multi-platform distribution can happen automatically. Our main inspiration for this project was the [Article-JSON](https://github.com/micnews/article-json) format we developed to solve an analogous problem for articles.

## Target formats

These are currently supported target formats:

[AMP story](https://github.com/micnews/story-json-to-amp)

[Video](https://github.com/micnews/story-json-to-video)

## Layout and styles

`story-json` uses Flexbox layout and styles that in most cases match CSS (`camelCase` notation, e.g. `justifyContent`). Since we want to support platforms other than the web, the list of styles is limited. Our current video implementation uses [Yoga](https://yogalayout.com/), a cross-platform layout engine made by Facebook, used in [React Native](https://facebook.github.io/react-native/).

The default value for `flexDirection` is `row`.

## Format structure

The following JSON is an example of a properly-formatted Story JSON document:

```json
{
  "title": "Story Title",
  "canonicalUrl": "https://example.com/story",
  "meta": {
    "datePublished": "2017-02-05T22:00:00.000Z",
    "dateModified": "2017-02-05T22:00:00.000Z",
    "author": "John Doe",
    "publisher": {
      "name": "Publisher Name",
      "logo": {
        "url": "https://example.com/publisher-logo",
        "width": 100,
        "height": 100
      }
    },
    "description": "Story description"
  },
  "pages": [
    {
      "annotation": "Page Annotation",
      "autoAdvanceAfter": 5,
      "layers": [
        {
          "template": "fill",
          "annotation": "Layer Annotation",
          "element": {
            "type": "video",
            "annotation": "Video Annotation",
            "sources": [
              {
                "source": "https://example.com/video.m3u8",
                "type": "application/x-mpegURL"
              }
            ],
            "width": 1900,
            "height": 600,
            "layout": "responsive",
            "poster": "https://example.com/poster.jpg",
            "loop": true,
            "autoplay": true
          }
        }
      ]
    },
    {
      "template": "vertical",
      "styles": {
        "justifyContent": "flex-end",
        "alignItems": "flex-end"
      },
      "elements": [
        {
          "type": "heading",
          "text": "This is a heading",
          "styles": {
            "width": 10,
            "height": 10,
            "border": {
              "width": 1,
              "color": "#000000",
              "style": "dashed"
            },
            "borderRadius": 10,
            "boxShadow": {
              "offset": {
                "x": 5,
                "y": 5
              },
              "blurRadius": 5,
              "spread": 10,
              "color": "#000000"
            },
            "textShadow": [
              {
                "offset": {
                  "x": 5,
                  "y": 5
                },
                "blurRadius": 5,
                "color": "#000000"
              }
            ],
            "transform": [
              {
                "rotate": "90deg"
              },
              {
                "translateX": "50%"
              },
              {
                "translateY": 50
              },
              {
                "scale": 2
              }
            ],
            "filter": [
              {
                "blur": 3
              },
              {
                "grayscale": "30%"
              }
            ],
            "backdropFilter": [
              {
                "blur": 3
              },
              {
                "grayscale": "30%"
              }
            ],
            "backgroundLinearGradient": {
              "direction": "50deg",
              "stops": [
                {
                  "color": "red",
                  "distance": 30
                },
                {
                  "color": "blue",
                  "distance": "50%"
                },
                {
                  "color": "black"
                }
              ]
            },
            "fontSize": 500,
            "paddingTop": 500
          }
        }
      ]
    } 
  ]
}
```

## Document properties

#### Top level

| Property  | Description | Type | Required |
| ------------- | ------------- | ------------- | ------------- |
| `title` | Story title. | string | no |
| `canonicalUrl` | Primary URL associated with the story. | string | no |
| `meta` | Story metadata. | [Story metadata](#story-metadata) | no |
| `canonicalUrl` | URL that will point to the story's HTML file. | string | no |
| `pages` | Array of pages in the story. | Array of [pages](#page) | no |
| `defaultStyles` | Default styles for each element. | Object with [element type](#element) keys and [style](#style) values | no |

#### Story metadata

| Property  | Description | Type | Required |
| ------------- | ------------- | ------------- | ------------- |
| `datePublished` | Story publish date in UTC. | [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) Date | no |
| `dateModified` | Story last modification date in UTC. | [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) Date | no |
| `author` | Author name. | string | no |
| `publisher` | Story publisher metadata. | [Publisher metadata](#publisher-metadata) | no |
| `description` | Story description. | string | no |

#### Publisher metadata

| Property  | Description | Type | Required |
| ------------- | ------------- | ------------- | ------------- |
| `name` | Publisher name | string | yes |
| `logo` | Publisher logo | [Publisher metadata logo](#publisher-metadata-logo) |  no |

#### Publisher metadata logo

| Property  | Description | Type | Required |
| ------------- | ------------- | ------------- | ------------- |
| `url` | Logo image URL. | string | yes |
| `width` | Logo width in pixels. | number |  yes |
| `height` | Logo height in pixels. | number |  yes |

#### Page

| Property  | Description | Type | Required | Notes |
| ------------- | ------------- | ------------- | ------------- | ------------- |
| `layers` | Content of the page data | Array of [layers](#layer) | yes |
| `id` | Unique page identifier. | string | no |
| `annotation` | User-defined information associated with the page. | any | no | Will be removed in render. |

#### Layer

| Property  | Description | Type | Required | Notes |
| ------------- | ------------- | ------------- | ------------- | ------------- |
| `template` | Layer type (*all templates are deprecated except `fill`, which is going to be a default*). | `'fill'`, `'thirds'`, `'vertical'` or `'horizontal'` | yes |
| `elements` | Layer elements. | Array of [elements](#element) | no | Has no effect in layers with `template: 'fill'`. |
| `element` | Layer element in a layer with `template: 'fill'`. | [Element](#element) | no | Has no effect in layers without `template: 'fill'`.|
| `styles` | Layer styles. | [Styles object](#styles) | no |
| `annotation` | User-defined information associated with the layer | any | no | Will be removed in render. |

#### Element

| Property  | Description | Type | Required |
| ------------- | ------------- | ------------- | ------------- |
| `type` | Element type. | `'container'`, `'image'`, `'video'`, `'paragraph'`, `'heading'`, `'heading1'`, `'heading2'`, `'heading3'`, `'heading4'`, `'heading5'`, or `'heading6'` | yes |
| `id` | Unique element identifier. | string | no |
| `styles` | Element styles. | [Styles object](#styles) | no |
| `annotation` | User-defined information associated with the element; will be removed in render. | any | no |

#### Styles

Styles are very similar to CSS styles, but are intended to be usable and easy to reason about on platforms that don't use an HTML renderer; for example, via React Native. Depending on the chosen platform's capabilities, some properties may be ignored.

| Property  | Description | Type | Required | Notes |
| ------------- | ------------- | ------------- | ------------- | ------------- |
| `position` | Element position. | `'relative'` or `'absolute'` | no |
| `top` | Top position | [Distance](#distance-style) | no |
| `bottom` | Bottom position | [Distance](#distance-style) | no |
| `left` | Left position | [Distance](#distance-style) | no |
| `right` | Right position | [Distance](#distance-style) | no |
| `width` | Element width | [Distance](#distance-style) | no |
| `height` | Element height | [Distance](#distance-style) | no |
| `margin` | Element margin (top, bottom, left and right) | [Distance](#distance-style) | no | Not currently supported by `amp-story` |
| `marginTop` | Element margin top | [Distance](#distance-style) | no | Not currently supported by `amp-story` |
| `marginBottom` | Element margin bottom | [Distance](#distance-style) | no | Not currently supported by `amp-story` |
| `marginLeft` | Element margin left | [Distance](#distance-style) | no | Not currently supported by `amp-story` |
| `marginRight` | Element margin right | [Distance](#distance-style) | no | Not currently supported by `amp-story` |
| `padding` | Element padding (top, bottom, left and right) | [Distance](#distance-style) | no |
| `paddingTop` | Element padding top | [Distance](#distance-style) | no |
| `paddingBottom` | Element padding bottom | [Distance](#distance-style) | no |
| `paddingLeft` | Element padding left | [Distance](#distance-style) | no |
| `paddingRight` | Element padding right | [Distance](#distance-style) | no |
| `border` | Element border (top, bottom, left and right) | Border | no |
| `borderTop` | Element border top | Border | no |
| `borderBottom` | Element border bottom | Border | no |
| `borderLeft` | Element border left | Border | no |
| `borderRight` | Element border right | Border | no |
| `borderRadius` | Element border radius (top-left, top-right, bottom-left and bottom-right) | number | no |
| `borderTopLeftRadius` | Element top-left border radius | number | no |
| `borderTopRightRadius` | Element top-right border radius | number | no |
| `borderBottomLeftRadius` | Element bottom-left border radius | number | no |
| `borderBottomRightRadius` | Element bottom-right border radius | number | no |
| `display` | Display type | `'flex'`, or `'none'` | no |
| `flexDirection` | `'row'`, `'row-reverse'`, `'column'`, or `'column-reverse'` | string | no |
| `justifyContent` | `'flex-start'`, `'center'`, `'flex-end'`, `'space-around'`, or `'space-between'` | string | no |
| `alignItems` | `'flex-start'`, `'center'`, `'flex-end'`, or `'stretch'` | string | no |
| `textAlign` | `'auto'`, `'left'`, `'right'`, `'center'`, or `'justify'` | string | no |
| `backgroundColor` | Background color | RGBA hex string | no |
| `backgroundLinearGradient` | Linear gradient | Linear Gradient | no |
| `color` | Text color | RGBA hex string | no |
| `boxShadow` | Shadow effect | Box shadow or array of box shadows | no |
| `fontFamily` | Text font | string | no |
| `fontSize` | Text font size | number | no |
| `lineHeight` | Text line height | number | no |
| `fontStyle` | `'normal'` or `'italic'` | string | no |
| `textShadow` | Shadow effect | Text shadow or array of text shadows | no |
| `opacity` | Opacity | number | no |
| `transform` | Transforms to apply to element | Array of transforms | no |
| `filter` | Filters to apply to element | Array of filters | no |
| `backdropFilter` | Backdrop filters to apply to element | Array of filters | no | https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter |

#### Distance Style

`Distance` - absolute number or percentage string (for example, `10` or `'10%'`)

#### Border Style

| Property  | Description | Type | Required |
| ------------- | ------------- | ------------- | ------------- |
| `width` | Border width | number | yes |
| `color` | Border color | RGBA hex string | yes |
| `style` | Border style (`solid`, `dotted`, `dashed`) | string | yes |

#### Linear Gradient

| Property  | Description | Type | Required |
| ------------- | ------------- | ------------- | ------------- |
| `direction` | Direction angle | angle string | yes |
| `stops` | Gradient stops | Array of [linear gradient stops](#linear-gradient-stop) | yes |

#### Linear Gradient Stop

| Property  | Description | Type | Required |
| ------------- | ------------- | ------------- | ------------- |
| `color` | Gradient stop color | RGBA hex string | yes |
| `distance` | Gradient stop distance | [Distance](#distance-style) | no |

#### Shadow and Box Shadow

| Property  | Description | Type | Required |
| ------------- | ------------- | ------------- | ------------- |
| `offset` | Shadow offsets | { x: number, y: number } | yes |
| `color` | Shadow color | RGBA hex string | no |
| `blurRadius` | Shadow blur radius | number | no |
| `spread` | Shadow spread (Box Shadow only) | number | no |

#### Transform

Transform object contains one of the following properties:

| Property | Type |
| ------------- | ------------- |
| `perspective` | number |
| `rotate` | angle string |
| `rotateX` | angle string |
| `rotateY` | angle string |
| `rotateZ` | angle string |
| `scale` | number |
| `scaleX` | number |
| `scaleY` | number |
| `scaleZ` | number |
| `translateX` | [Distance](#distance-style) |
| `translateY` | [Distance](#distance-style) |
| `skewX` | angle string |
| `skewY` | angle string |

#### Filter

Filter object contains one of the following properties:

| Property | Type |
| ------------- | ------------- |
| `blur` | [Distance](#distance-style) |
| `brightness` | number |
| `grayscale` | percentage string |
