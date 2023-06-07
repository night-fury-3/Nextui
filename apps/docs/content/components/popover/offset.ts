const App = `import {Popover, PopoverTrigger, PopoverContent, Button} from "@nextui-org/react";

export default function App() {
  return (
    <Popover placement="bottom" offset={20} showArrow>
      <PopoverTrigger>
        <Button variant="flat">Open Popover</Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="px-1 py-2">
          <div className="text-sm font-bold">Popover Content</div>
          <div className="text-xs">This is the popover content</div>
        </div>
      </PopoverContent>
    </Popover>
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
