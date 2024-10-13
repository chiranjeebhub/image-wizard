"use client";

import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Crop,
  Maximize,
  RotateCcw,
  FlipHorizontal,
  Sliders,
  Image as ImageIcon,
  Type,
  Download,
} from "lucide-react";

export default function EditPage() {
  const [activeTab, setActiveTab] = useState("crop");

  const renderTabContent = () => {
    switch (activeTab) {
      case "crop":
        return <CropTab />;
      case "resize":
        return <ResizeTab />;
      case "rotate":
        return <RotateTab />;
      case "flip":
        return <FlipTab />;
      case "adjust":
        return <AdjustTab />;
      case "filters":
        return <FiltersTab />;
      case "text":
        return <TextTab />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Left sidebar */}
      <div className="w-20 bg-white shadow-md flex flex-col items-center py-4 space-y-6">
        <TabButton
          icon={<Crop />}
          label="Crop"
          active={activeTab === "crop"}
          onClick={() => setActiveTab("crop")}
        />
        <TabButton
          icon={<Maximize />}
          label="Resize"
          active={activeTab === "resize"}
          onClick={() => setActiveTab("resize")}
        />
        <TabButton
          icon={<RotateCcw />}
          label="Rotate"
          active={activeTab === "rotate"}
          onClick={() => setActiveTab("rotate")}
        />
        <TabButton
          icon={<FlipHorizontal />}
          label="Flip"
          active={activeTab === "flip"}
          onClick={() => setActiveTab("flip")}
        />
        <TabButton
          icon={<Sliders />}
          label="Adjust"
          active={activeTab === "adjust"}
          onClick={() => setActiveTab("adjust")}
        />
        <TabButton
          icon={<ImageIcon />}
          label="Filters"
          active={activeTab === "filters"}
          onClick={() => setActiveTab("filters")}
        />
        <TabButton
          icon={<Type />}
          label="Text"
          active={activeTab === "text"}
          onClick={() => setActiveTab("text")}
        />
      </div>

      {/* Main content */}
      <div className="flex-1 p-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <img
            src="/placeholder.svg?height=400&width=600"
            alt="Editable image"
            className="w-full h-auto"
          />
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          {renderTabContent()}
        </div>
      </div>

      {/* Right sidebar */}
      <div className="w-64 bg-white shadow-md p-4">
        <Button className="w-full mb-4">
          <Download className="mr-2" />
          Save Image
        </Button>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">File name</h3>
            <Input placeholder="image.jpg" />
          </div>
          <div>
            <h3 className="font-semibold mb-2">Format</h3>
            <select className="w-full p-2 border rounded">
              <option>JPG</option>
              <option>PNG</option>
              <option>WebP</option>
            </select>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Quality</h3>
            <Slider defaultValue={[80]} max={100} step={1} />
          </div>
        </div>
      </div>
    </div>
  );
}

function TabButton({ icon, label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-colors ${
        active ? "bg-blue-100 text-blue-600" : "text-gray-500 hover:bg-gray-100"
      }`}
    >
      {icon}
      <span className="text-xs">{label}</span>
    </button>
  );
}

function CropTab() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Crop</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Aspect Ratio
          </label>
          <select className="w-full p-2 border rounded">
            <option>Free</option>
            <option>1:1</option>
            <option>4:3</option>
            <option>16:9</option>
          </select>
        </div>
        <Button>Apply Crop</Button>
      </div>
    </div>
  );
}

function ResizeTab() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Resize</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Width
          </label>
          <Input type="number" placeholder="Width in pixels" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Height
          </label>
          <Input type="number" placeholder="Height in pixels" />
        </div>
        <Button>Apply Resize</Button>
      </div>
    </div>
  );
}

function RotateTab() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Rotate</h2>
      <div className="space-y-4">
        <Button>Rotate Left 90°</Button>
        <Button>Rotate Right 90°</Button>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Custom Angle
          </label>
          <Slider defaultValue={[0]} max={360} step={1} />
        </div>
        <Button>Apply Rotation</Button>
      </div>
    </div>
  );
}

function FlipTab() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Flip</h2>
      <div className="space-y-4">
        <Button>Flip Horizontal</Button>
        <Button>Flip Vertical</Button>
      </div>
    </div>
  );
}

function AdjustTab() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Adjust</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Brightness
          </label>
          <Slider defaultValue={[100]} max={200} step={1} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Contrast
          </label>
          <Slider defaultValue={[100]} max={200} step={1} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Saturation
          </label>
          <Slider defaultValue={[100]} max={200} step={1} />
        </div>
        <Button>Apply Adjustments</Button>
      </div>
    </div>
  );
}

function FiltersTab() {
  const filters = ["None", "Grayscale", "Sepia", "Vintage", "Blur", "Sharpen"];
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Filters</h2>
      <div className="grid grid-cols-3 gap-4">
        {filters.map((filter) => (
          <Button key={filter} variant="outline">
            {filter}
          </Button>
        ))}
      </div>
    </div>
  );
}

function TextTab() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Add Text</h2>
      <div className="space-y-4">
        <Input placeholder="Enter text" />
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Font
          </label>
          <select className="w-full p-2 border rounded">
            <option>Arial</option>
            <option>Helvetica</option>
            <option>Times New Roman</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Size
          </label>
          <Slider defaultValue={[16]} max={72} step={1} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Color
          </label>
          <Input type="color" />
        </div>
        <Button>Add Text</Button>
      </div>
    </div>
  );
}
