const Validator = require('jsonschema').Validator;

const storyJson = new Validator();

// Extended color validator from jsonschema that also supports rgba()
// https://github.com/tdegrunt/jsonschema/blob/master/lib/helpers.js
const color = /^(#?([0-9A-Fa-f]{3}){1,2}\b|aqua|black|blue|fuchsia|gray|green|lime|maroon|navy|olive|orange|purple|red|silver|teal|white|yellow|(rgb\(\s*\b([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\b\s*,\s*\b([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\b\s*,\s*\b([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\b\s*\))|(rgba\(\s*\b([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\b\s*,\s*\b([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\b\s*,\s*\b([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\b\s*,\s*\b([0-1]\.\d+)\b\s*\))|(rgb\(\s*(\d?\d%|100%)+\s*,\s*(\d?\d%|100%)+\s*,\s*(\d?\d%|100%)+\s*\)))$/;

const distanceSchema = {
  id: '/Distance',
  oneOf: [
    { type: 'number' },
    { type: 'string', pattern: /^[-0-9.]+%$/ },
  ],
};
storyJson.addSchema(distanceSchema, distanceSchema.id);

const angleSchema = {
  id: '/Angle',
  oneOf: [
    { type: 'number' },
    { type: 'string', pattern: /^[-0-9.]+deg$/ },
  ],
};
storyJson.addSchema(angleSchema, angleSchema.id);

const borderSchema = {
  id: '/Border',
  type: 'object',
  properties: {
    width: { type: 'number', required: true },
    color: { type: 'string', pattern: color, required: true },
    style: { enum: ['solid', 'dotted', 'dashed'], required: true },
  },
};
storyJson.addSchema(borderSchema, borderSchema.id);

const shadowSchema = {
  id: '/Shadow',
  type: 'object',
  properties: {
    offset: {
      type: 'object',
      properties: {
        x: { type: 'number' },
        y: { type: 'number' },
      },
    },
    color: { type: 'string', pattern: color, required: true },
    blurRadius: { type: 'number' },
    spread: { type: 'number' },
  },
};
storyJson.addSchema(shadowSchema, shadowSchema.id);

const linearGradientSchema = {
  id: '/LinearGradient',
  type: 'object',
  properties: {
    direction: { $ref: '/Angle', required: true },
    stops: {
      type: 'array',
      required: true,
      items: {
        type: 'object',
        properties: {
          color: { type: 'string', pattern: color, required: true },
          distance: { $ref: '/Distance', required: true },
        },
      },
    },
  },
};
storyJson.addSchema(linearGradientSchema, linearGradientSchema.id);

const stylesSchema = {
  id: '/Styles',
  type: 'object',
  properties: {
    top: { $ref: '/Distance' },
    bottom: { $ref: '/Distance' },
    left: { $ref: '/Distance' },
    right: { $ref: '/Distance' },
    width: { $ref: '/Distance' },
    height: { $ref: '/Distance' },
    margin: { $ref: '/Distance' },
    marginTop: { $ref: '/Distance' },
    marginBottom: { $ref: '/Distance' },
    marginLeft: { $ref: '/Distance' },
    marginRight: { $ref: '/Distance' },
    padding: { $ref: '/Distance' },
    paddingTop: { $ref: '/Distance' },
    paddingBottom: { $ref: '/Distance' },
    paddingLeft: { $ref: '/Distance' },
    paddingRight: { $ref: '/Distance' },
    position: { enum: ['relative', 'absolute'] },
    flex: { type: 'number' },
    border: { $ref: '/Border' },
    borderTop: { $ref: '/Border' },
    borderBottom: { $ref: '/Border' },
    borderLeft: { $ref: '/Border' },
    borderRight: { $ref: '/Border' },
    borderRadius: { type: 'number' },
    borderTopLeftRadius: { type: 'number' },
    borderTopRightRadius: { type: 'number' },
    borderBottomLeftRadius: { type: 'number' },
    borderBottomRightRadius: { type: 'number' },
    display: { enum: ['flex', 'none'] },
    flexDirection: {
      enum: ['row', 'row-reverse', 'column', 'column-reverse'],
    },
    justifyContent: {
      enum: ['flex-start', 'center', 'flex-end', 'space-around', 'space-between'],
    },
    alignItems: {
      enum: ['flex-start', 'center', 'flex-end', 'stretch'],
    },
    textAlign: {
      enum: ['auto', 'left', 'right', 'center', 'justify'],
    },
    backgroundColor: { type: 'string', pattern: color },
    backgroundLinearGradient: { $ref: '/LinearGradient' },
    color: { type: 'string', pattern: color },
    boxShadow: {
      oneOf: [
        { $ref: '/Shadow' },
        { type: 'array', items: { $ref: '/Shadow' } },
      ],
    },
    fontFamily: { type: 'string' },
    fontSize: { type: 'number' },
    lineHeight: { type: 'number' },
    fontStyle: { enum: ['normal', 'italic'] },
    textShadow: {
      oneOf: [
        { $ref: '/Shadow' },
        { type: 'array', items: { $ref: '/Shadow' } },
      ],
    },
    opacity: { type: 'number' },
    transform: {
      type: 'array',
      items: {
        oneOf: [
          { type: 'object', properties: { perspective: { type: 'number' } } },
          { type: 'object', properties: { rotate: { $ref: '/Angle' } } },
          { type: 'object', properties: { rotateX: { $ref: '/Angle' } } },
          { type: 'object', properties: { rotateY: { $ref: '/Angle' } } },
          { type: 'object', properties: { rotateZ: { $ref: '/Angle' } } },
          { type: 'object', properties: { scale: { type: 'number' } } },
          { type: 'object', properties: { scaleX: { type: 'number' } } },
          { type: 'object', properties: { scaleY: { type: 'number' } } },
          { type: 'object', properties: { scaleZ: { type: 'number' } } },
          { type: 'object', properties: { translateX: { $ref: '/Distance' } } },
          { type: 'object', properties: { translateY: { $ref: '/Distance' } } },
          { type: 'object', properties: { skewX: { $ref: '/Angle' } } },
          { type: 'object', properties: { skewY: { $ref: '/Angle' } } },
        ],
      },
    },
    filter: {
      type: 'array',
      items: {
        oneOf: [
          {
            title: '{ blur: ... }',
            type: 'object',
            properties: { blur: { $ref: '/Distance', required: true } },
            additionalProperties: false,
          },
          {
            title: '{ brightness: ... }',
            type: 'object',
            properties: { brightness: { type: 'number', required: true } },
            additionalProperties: false,
          },
          {
            title: '{ grayscale: ... }',
            type: 'object',
            properties: {
              grayscale: { type: 'string', pattern: /^[-0-9.]+%$/, required: true },
            },
            additionalProperties: false,
          },
        ],
      },
    },
  },
};
storyJson.addSchema(stylesSchema, stylesSchema.id);

const containerElementSchema = {
  id: '/ContainerElement',
  type: 'object',
  properties: {
    type: { const: 'container', required: true },
    elements: { type: 'array', items: { $ref: '/Element' } },
    styles: { $ref: '/Styles' },
  },
};
storyJson.addSchema(containerElementSchema, containerElementSchema.id);

const headingElementSchema = {
  id: '/HeadingElement',
  type: 'object',
  properties: {
    type: {
      enum: [
        'paragraph',
        'heading',
        'heading1',
        'heading2',
        'heading3',
        'heading4',
        'heading5',
        'heading6',
      ],
      required: true,
    },
    styles: { $ref: '/Styles' },
  },
};
storyJson.addSchema(headingElementSchema, headingElementSchema.id);

const videoElementSchema = {
  id: '/VideoElement',
  type: 'object',
  properties: {
    type: {
      const: 'video',
      required: true,
    },
    sources: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          source: { type: 'string', format: 'uri', required: true },
          type: { type: 'string', required: true },
        },
        required: true,
      },
    },
    width: { type: 'number', required: true },
    height: { type: 'number', required: true },
    poster: { type: 'string', format: 'uri' },
    loop: { type: 'boolean' },
    autoplay: { type: 'boolean' },
    styles: { $ref: '/Styles' },
  },
};
storyJson.addSchema(videoElementSchema, videoElementSchema.id);

const imageElementSchema = {
  id: '/ImageElement',
  type: 'object',
  properties: {
    type: {
      const: 'image',
      required: true,
    },
    source: { type: 'string', format: 'uri', required: true },
    width: { type: 'number', required: true },
    height: { type: 'number', required: true },
    styles: { $ref: '/Styles' },
  },
};
storyJson.addSchema(imageElementSchema, imageElementSchema.id);

const elementSchema = {
  id: '/Element',
  type: 'object',
  oneOf: [
    { $ref: '/ContainerElement' },
    { $ref: '/HeadingElement' },
    { $ref: '/VideoElement' },
    { $ref: '/ImageElement' },
  ],
};
storyJson.addSchema(elementSchema, elementSchema.id);

const pageSchema = {
  id: '/Page',
  type: 'object',
  properties: {
    layers: {
      type: 'array',
      items: { $ref: '/Element' },
    },
  },
};
storyJson.addSchema(pageSchema, pageSchema.id);

const schema = {
  type: 'object',
  properties: {
    version: { const: 1 },
    title: { type: 'string' },
    canonicalUrl: { type: 'string', format: 'uri' },
    defaultStyles: {
      type: 'object',
      properties: {
        container: { $ref: '/Styles' },
        image: { $ref: '/Styles' },
        video: { $ref: '/Styles' },
        paragraph: { $ref: '/Styles' },
        heading: { $ref: '/Styles' },
        heading1: { $ref: '/Styles' },
        heading2: { $ref: '/Styles' },
        heading3: { $ref: '/Styles' },
        heading4: { $ref: '/Styles' },
        heading5: { $ref: '/Styles' },
        heading6: { $ref: '/Styles' },
      },
    },
    pages: {
      type: 'array',
      items: { $ref: '/Page' },
    },
  },
};

module.exports = json => storyJson.validate(json, schema);
