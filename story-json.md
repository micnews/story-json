# story-json

`story-json` is the JavaScript Object Notation (JSON) platform-agnostic document format that describes interactive content that user can "tap" through. This is an interactive storytelling format, optimized for quick consumption on a smartphone or tablet, but can be viewed on desktop as well.

"Story" consists of a set of slides (or pages). Each slide can contain various kinds of content, but in most cases, it has a short video or photo background, with the text or animation overlayed on top. Story document can be created once and then transformed into target format, for example [amp-story](https://github.com/ampproject/amphtml/blob/master/extensions/amp-story/amp-story.md). Or converted into video or shideshow.

## Format structure

The following JSON is the document example:

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
| `meta` | Story metadata. | Story metadata | no |
| `pages` | Array of pages in the story. | Array of pages | no |

#### Story metadata

| Property  | Description | Type | Required |
| ------------- | ------------- | ------------- | ------------- |
| `datePublished` | Story UTC publish date. | [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) Date | no |
| `dateModified` | Story last modification UTC. | [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) Date | no |
| `author` | Author name. | string | no |
| `publisher` | Story publisher metadata. | Publisher metadata | no |
| `description` | Story description. | string | no |

#### Publisher metadata

| Property  | Description | Type | Required |
| ------------- | ------------- | ------------- | ------------- |
| `name` | Publisher name | string | yes |
| `logo` | Publisher logo | Publisher metadata logo |  no |

#### Publisher metadata logo

| Property  | Description | Type | Required |
| ------------- | ------------- | ------------- | ------------- |
| `url` | Logo image URL. | string | yes |
| `width` | Logo width in pixels. | number |  yes |
| `height` | Logo height in pixels. | number |  yes |

#### Page

| Property  | Description | Type | Required |
| ------------- | ------------- | ------------- | ------------- |
| `layers` | Content of the page data | Array of layers | yes |
| `id` | Unique page identifier. | string | no |
| `annotation` | Any additional information associated with the page. | any | no |

#### Layer

| Property  | Description | Type | Required |
| ------------- | ------------- | ------------- | ------------- |
| `template` | Layer type (`fill`, `thirds`, `vertical` or `horizontal`). | string | yes |
| `elements` | Layer elements. | Array of elements | no |
| `styles` | Layer styles. | Styles | no |
| `annotation` | Any additional information associated with the layer. | any | no |

#### Element

| Property  | Description | Type | Required |
| ------------- | ------------- | ------------- | ------------- |
| `type` | Element type (`container`, `image`, `video`, `paragraph`, `heading`, `heading1`, `heading2`, `heading3`, `heading4`, `heading5` or `heading6`). | string | yes |
| `id` | Unique element identifier. | string | no |
| `styles` | Element styles. | Styles | no |
| `annotation` | Any additional information associated with the element. | any | no |

#### Styles

Styles are very similar to CSS styles, but intended to be usable on platforms that don't use HTML renderer. For example, via React Native or implemented in a custom renderer. Depending on platform, some properties may be ignored.

| Property  | Description | Type | Required |
| ------------- | ------------- | ------------- | ------------- |
| `position` | Element position (`relative` or `absolute`). | string | no |
| `top` | Top position | Distance | no |
| `bottom` | Bottom position | Distance | no |
| `left` | Left position | Distance | no |
| `right` | Right position | Distance | no |
| `width` | Element width | Distance | no |
| `height` | Element height | Distance | no |
| `margin` | Element margin (top, bottom, left and right) | Distance | no |
| `marginTop` | Element margin top | Distance | no |
| `marginBottom` | Element margin bottom | Distance | no |
| `marginLeft` | Element margin left | Distance | no |
| `marginRight` | Element margin right | Distance | no |
| `padding` | Element padding (top, bottom, left and right) | Distance | no |
| `paddingTop` | Element padding top | Distance | no |
| `paddingBottom` | Element padding bottom | Distance | no |
| `paddingLeft` | Element padding left | Distance | no |
| `paddingRight` | Element padding right | Distance | no |
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
| `display` | Display type (`block`, `inline`, `inline-block`, `flex` or `inline-flex`) | string | no |
| `flexDirection` | `row`, `row-reverse`, `column` or `column-reverse` | string | no |
| `justifyContent` | `flex-start`, `center`, `flex-end`, `space-around` or `space-between` | string | no |
| `alignItems` | `flex-start`, `center`, `flex-end` or `stretch` | string | no |
| `textAlign` | `auto`, `left`, `right`, `center` or `justify` | string | no |
| `backgroundColor` | Background color | RGBA hex string | no |
| `backgroundLinearGradient` | Linear gradient | Linear Gradient | no |
| `color` | Text color | RGBA hex string | no |
| `boxShadow` | Shadow effect | Box shadow or array of box shadows | no |
| `fontFamily` | Text font | string | no |
| `fontSize` | Text font size | number | no |
| `lineHeight` | Text line height | number | no |
| `fontStyle` | `normal` or `italic` | string | no |
| `textShadow` | Shadow effect | Text shadow or array of text shadows | no |
| `opacity` | Opacity | number | no |
| `transform` | Transforms to apply to element | Array of transforms | no |
| `filter` | Filters to apply to element | Array of filters | no |
| `backdropFilter` | Backdrop filters to apply to element | Array of filters | no |

#### Distance Style

`Distance` - absolute number or percentage string (for example, `10` or `10%`)

#### Border Style

| Property  | Description | Type | Required |
| ------------- | ------------- | ------------- | ------------- |
| `width` | Border width | number | yes |
| `color` | Border color | RGBA hex string | yes |
| `style` | Border style (`solid`, `dotted`, `dashed`) | string | yes |

#### Linear Gradient

| Property  | Description | Type | Required |
| ------------- | ------------- | ------------- | ------------- |
| `direction` | Direction angle | string | yes |
| `stops` | Gradient stops | Array of gradient stops | yes |

#### Linear Gradient Stop

| Property  | Description | Type | Required |
| ------------- | ------------- | ------------- | ------------- |
| `color` | Gradient stop color | RGBA hex string | yes |
| `distance` | Gradient stop distance | Distance | no |

#### Shadow and Box Shadow

| Property  | Description | Type | Required |
| ------------- | ------------- | ------------- | ------------- |
| `offset` | Shadow offsets | Object with x and y properies (numbers) | yes |
| `color` | Shadow color | RGBA hex string | no |
| `blurRadius` | Shadow blur radius | number | no |
| `spread` | Shadow spread (Box Shadow only) | number | no |

#### Transform

Transform object contains one of the following properties:

| Property | Type |
| ------------- | ------------- |
| `perspective` | number |
| `rotate` | angle (number) |
| `rotateX` | angle (number) |
| `rotateY` | angle (number) |
| `rotateZ` | angle (number) |
| `scale` | number |
| `scaleX` | number |
| `scaleY` | number |
| `scaleZ` | number |
| `translateX` | Distance |
| `translateY` | Distance |
| `skewX` | number |
| `skewY` | number |

#### Filter

Filter object contains one of the following properties:

| Property | Type |
| ------------- | ------------- |
| `blur` | Distance |
| `brightness` | number |
| `grayscale` | percentage string |
