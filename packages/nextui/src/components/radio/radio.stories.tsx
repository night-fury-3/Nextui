import React from 'react';
import { Meta } from '@storybook/react';
import Radio from './index';

export default {
  title: 'Inputs/Radio',
  component: Radio,
  onChange: { action: 'changed' },
} as Meta;

export const Default = () => (
  <Radio.Group value="A">
    <Radio value="A">Option A</Radio>
    <Radio value="B">Option B</Radio>
    <Radio value="C">Option C</Radio>
    <Radio value="D">Option D</Radio>
  </Radio.Group>
);

export const Colors = () => (
  <Radio.Group value="primary">
    <Radio value="primary" color="primary" checked={true}>
      Primary
    </Radio>
    <br />
    <Radio value="secondary" color="secondary">
      Secondary
    </Radio>
    <br />
    <Radio value="success" color="success">
      Success
    </Radio>
    <br />
    <Radio value="warning" color="warning">
      Warning
    </Radio>
    <br />
    <Radio value="error" color="error">
      Error
    </Radio>
  </Radio.Group>
);

export const TextColors = () => (
  <Radio.Group value="primary">
    <Radio value="primary" color="primary" textColor="primary">
      Primary
    </Radio>
    <br />
    <Radio value="secondary" color="secondary" textColor="secondary">
      Secondary
    </Radio>
    <br />
    <Radio value="success" color="success" textColor="success">
      Success
    </Radio>
    <br />
    <Radio value="warning" color="warning" textColor="warning">
      Warning
    </Radio>
    <br />
    <Radio value="error" color="error" textColor="error">
      Error
    </Radio>
  </Radio.Group>
);

export const Sizes = () => (
  <>
    <Radio checked={false} size="mini">
      mini
    </Radio>
    <Radio checked={false} size="small">
      small
    </Radio>
    <Radio checked={false} size="medium">
      medium
    </Radio>
    <Radio checked={false} size="large">
      large
    </Radio>
    <Radio checked={false} size="xlarge">
      xlarge
    </Radio>
  </>
);

export const Disabled = () => (
  <Radio.Group value="1">
    <Radio value="1">Option 1</Radio>
    <Radio value="2" disabled>
      Option 2
    </Radio>
    <Radio value="3">Option 3</Radio>
    <Radio value="4" disabled>
      Option 4
    </Radio>
  </Radio.Group>
);

export const Description = () => (
  <Radio.Group value="1">
    <Radio value="1">
      Option 1<Radio.Description>Description for Option1</Radio.Description>
    </Radio>
    <Radio value="2">
      Option 2<Radio.Desc>Description for Option2</Radio.Desc>
    </Radio>
    <Radio value="3">
      Option 3<Radio.Desc>Description for Option2</Radio.Desc>
    </Radio>
  </Radio.Group>
);

export const Row = () => (
  <Radio.Group value="1" row>
    <Radio value="1">
      Option 1<Radio.Desc>Description for Option1</Radio.Desc>
    </Radio>
    <Radio value="2">
      Option 2<Radio.Desc>Description for Option2</Radio.Desc>
    </Radio>
    <Radio value="3">
      Option 3<Radio.Desc>Description for Option2</Radio.Desc>
    </Radio>
  </Radio.Group>
);
