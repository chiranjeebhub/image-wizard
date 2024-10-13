"use client";

import { useState, useEffect, useRef } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Crop,
  Maximize,
  RotateCcw,
  RotateCw,
  FlipHorizontal,
  FlipVertical,
  Sliders,
  Image as ImageIcon,
  Type,
  Download,
  Square,
  Monitor,
  MoveHorizontal,
  MoveVertical,
  Sun,
  Contrast,
  Palette,
  Droplet,
  RectangleHorizontal,
  Scissors,
  Eraser,
  Paintbrush,
  AlignLeft,
  AlignCenter,
  AlignRight,
} from "lucide-react";
import { useRouter } from "next/navigation";
import ImageWizardLogo from "@/components/ImageWizardLogo";

export default function Component() {
  const [image, setImage] = useState<string | null>(null);
  const [editedImage, setEditedImage] = useState<string | null>(null);
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("crop");
  const [activeSubTab, setActiveSubTab] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedImage = localStorage.getItem("editImage");
    if (storedImage) {
      setImage(storedImage);
      setEditedImage(storedImage);
      setOriginalImage(storedImage);
    } else {
      router.push("/");
    }
  }, [router]);

  useEffect(() => {
    if (image) {
      const img = new Image();
      img.onload = () => {
        if (canvasRef.current && containerRef.current) {
          const ctx = canvasRef.current.getContext("2d");
          if (ctx) {
            const containerWidth = containerRef.current.clientWidth;
            const containerHeight = containerRef.current.clientHeight;
            const imgAspectRatio = img.width / img.height;
            const containerAspectRatio = containerWidth / containerHeight;

            let newWidth, newHeight;

            if (imgAspectRatio > containerAspectRatio) {
              newWidth = containerWidth;
              newHeight = containerWidth / imgAspectRatio;
            } else {
              newHeight = containerHeight;
              newWidth = containerHeight * imgAspectRatio;
            }

            canvasRef.current.width = newWidth;
            canvasRef.current.height = newHeight;
            ctx.drawImage(img, 0, 0, newWidth, newHeight);
            setEditedImage(canvasRef.current.toDataURL());
          }
        }
      };
      img.src = image;
    }
  }, [image]);

  const handleGoBack = () => {
    localStorage.removeItem("editImage");
    router.push("/");
  };

  const applyEdit = (
    editFunction: (ctx: CanvasRenderingContext2D, img: HTMLImageElement) => void
  ) => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) {
        const img = new Image();
        img.onload = () => {
          const containerWidth = containerRef.current?.clientWidth || img.width;
          const containerHeight =
            containerRef.current?.clientHeight || img.height;
          const imgAspectRatio = img.width / img.height;
          const containerAspectRatio = containerWidth / containerHeight;

          let newWidth, newHeight;

          if (imgAspectRatio > containerAspectRatio) {
            newWidth = containerWidth;
            newHeight = containerWidth / imgAspectRatio;
          } else {
            newHeight = containerHeight;
            newWidth = containerHeight * imgAspectRatio;
          }

          canvasRef.current.width = newWidth;
          canvasRef.current.height = newHeight;
          ctx.drawImage(img, 0, 0, newWidth, newHeight);
          editFunction(ctx, img);
          setEditedImage(canvasRef.current.toDataURL());
        };
        img.src = editedImage || image;
      }
    }
  };

  const resetImage = () => {
    if (originalImage) {
      setImage(originalImage);
      setEditedImage(originalImage);
    }
  };

  if (!image) {
    return <div>Loading...</div>;
  }

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

  const CropTab = () => (
    <div className="flex items-center space-x-4">
      <TabButton
        icon={<Square className="h-6 w-6" />}
        label="1:1"
        active={activeSubTab === "1:1"}
        onClick={() => {
          if (activeSubTab === "1:1") {
            setActiveSubTab("");
            resetImage();
          } else {
            setActiveSubTab("1:1");
            applyEdit((ctx, img) => {
              const size = Math.min(img.width, img.height);
              const x = (img.width - size) / 2;
              const y = (img.height - size) / 2;
              const imageData = ctx.getImageData(x, y, size, size);
              ctx.canvas.width = size;
              ctx.canvas.height = size;
              ctx.putImageData(imageData, 0, 0);
            });
          }
        }}
      />
      <TabButton
        icon={<RectangleHorizontal className="h-6 w-6" />}
        label="4:3"
        active={activeSubTab === "4:3"}
        onClick={() => {
          if (activeSubTab === "4:3") {
            setActiveSubTab("");
            resetImage();
          } else {
            setActiveSubTab("4:3");
            applyEdit((ctx, img) => {
              const aspectRatio = 4 / 3;
              let width = img.width;
              let height = img.height;
              if (width / height > aspectRatio) {
                width = height * aspectRatio;
              } else {
                height = width / aspectRatio;
              }
              const x = (img.width - width) / 2;
              const y = (img.height - height) / 2;
              const imageData = ctx.getImageData(x, y, width, height);
              ctx.canvas.width = width;
              ctx.canvas.height = height;
              ctx.putImageData(imageData, 0, 0);
            });
          }
        }}
      />
      <TabButton
        icon={<Monitor className="h-6 w-6" />}
        label="16:9"
        active={activeSubTab === "16:9"}
        onClick={() => {
          if (activeSubTab === "16:9") {
            setActiveSubTab("");
            resetImage();
          } else {
            setActiveSubTab("16:9");
            applyEdit((ctx, img) => {
              const aspectRatio = 16 / 9;
              let width = img.width;
              let height = img.height;
              if (width / height > aspectRatio) {
                width = height * aspectRatio;
              } else {
                height = width / aspectRatio;
              }
              const x = (img.width - width) / 2;
              const y = (img.height - height) / 2;
              const imageData = ctx.getImageData(x, y, width, height);
              ctx.canvas.width = width;
              ctx.canvas.height = height;
              ctx.putImageData(imageData, 0, 0);
            });
          }
        }}
      />
    </div>
  );

  const ResizeTab = () => (
    <div className="flex items-center space-x-4">
      <TabButton
        icon={<MoveHorizontal className="h-6 w-6" />}
        label="Width"
        active={activeSubTab === "width"}
        onClick={() => setActiveSubTab(activeSubTab === "width" ? "" : "width")}
      />
      <TabButton
        icon={<MoveVertical className="h-6 w-6" />}
        label="Height"
        active={activeSubTab === "height"}
        onClick={() =>
          setActiveSubTab(activeSubTab === "height" ? "" : "height")
        }
      />
      <TabButton
        icon={<Maximize className="h-6 w-6" />}
        label="Custom"
        active={activeSubTab === "custom"}
        onClick={() =>
          setActiveSubTab(activeSubTab === "custom" ? "" : "custom")
        }
      />
      <Input
        type="number"
        placeholder="Enter size"
        className="w-24"
        onChange={(e) => {
          const size = parseInt(e.target.value);
          if (size > 0) {
            applyEdit((ctx, img) => {
              const aspect = img.width / img.height;
              let newWidth, newHeight;
              if (activeSubTab === "width" || activeSubTab === "custom") {
                newWidth = size;
                newHeight = size / aspect;
              } else {
                newHeight = size;
                newWidth = size * aspect;
              }
              ctx.canvas.width = newWidth;
              ctx.canvas.height = newHeight;
              ctx.drawImage(img, 0, 0, newWidth, newHeight);
            });
          } else {
            resetImage();
          }
        }}
      />
    </div>
  );

  const RotateTab = () => (
    <div className="flex items-center space-x-4">
      <TabButton
        icon={<RotateCcw className="h-6 w-6" />}
        label="Left 90°"
        active={activeSubTab === "left90"}
        onClick={() => {
          if (activeSubTab === "left90") {
            setActiveSubTab("");
            resetImage();
          } else {
            setActiveSubTab("left90");
            applyEdit((ctx, img) => {
              ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
              ctx.save();
              ctx.translate(img.height / 2, img.width / 2);
              ctx.rotate(-Math.PI / 2);
              ctx.drawImage(img, -img.width / 2, -img.height / 2);
              ctx.restore();
            });
          }
        }}
      />
      <TabButton
        icon={<RotateCw className="h-6 w-6" />}
        label="Right 90°"
        active={activeSubTab === "right90"}
        onClick={() => {
          if (activeSubTab === "right90") {
            setActiveSubTab("");
            resetImage();
          } else {
            setActiveSubTab("right90");
            applyEdit((ctx, img) => {
              ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
              ctx.save();
              ctx.translate(img.height / 2, img.width / 2);
              ctx.rotate(Math.PI / 2);
              ctx.drawImage(img, -img.width / 2, -img.height / 2);
              ctx.restore();
            });
          }
        }}
      />
      <div className="w-40">
        <Slider
          defaultValue={[0]}
          max={360}
          step={1}
          onValueChange={(value) => {
            if (value[0] === 0) {
              resetImage();
            } else {
              applyEdit((ctx, img) => {
                const angle = (value[0] * Math.PI) / 180;
                ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
                ctx.save();
                ctx.translate(img.width / 2, img.height / 2);
                ctx.rotate(angle);
                ctx.drawImage(img, -img.width / 2, -img.height / 2);
                ctx.restore();
              });
            }
          }}
        />
      </div>
    </div>
  );

  const FlipTab = () => (
    <div className="flex items-center space-x-4">
      <TabButton
        icon={<FlipHorizontal className="h-6 w-6" />}
        label="Horizontal"
        active={activeSubTab === "horizontal"}
        onClick={() => {
          if (activeSubTab === "horizontal") {
            setActiveSubTab("");
            resetImage();
          } else {
            setActiveSubTab("horizontal");
            applyEdit((ctx, img) => {
              ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
              ctx.translate(img.width, 0);
              ctx.scale(-1, 1);
              ctx.drawImage(img, 0, 0, img.width, img.height);
            });
          }
        }}
      />
      <TabButton
        icon={<FlipVertical className="h-6 w-6" />}
        label="Vertical"
        active={activeSubTab === "vertical"}
        onClick={() => {
          if (activeSubTab === "vertical") {
            setActiveSubTab("");
            resetImage();
          } else {
            setActiveSubTab("vertical");
            applyEdit((ctx, img) => {
              ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
              ctx.translate(0, img.height);
              ctx.scale(1, -1);
              ctx.drawImage(img, 0, 0, img.width, img.height);
            });
          }
        }}
      />
    </div>
  );

  const AdjustTab = () => (
    <div className="flex items-center space-x-4">
      <TabButton
        icon={<Sun className="h-6 w-6" />}
        label="Brightness"
        active={activeSubTab === "brightness"}
        onClick={() =>
          setActiveSubTab(activeSubTab === "brightness" ? "" : "brightness")
        }
      />
      <TabButton
        icon={<Contrast className="h-6 w-6" />}
        label="Contrast"
        active={activeSubTab === "contrast"}
        onClick={() =>
          setActiveSubTab(activeSubTab === "contrast" ? "" : "contrast")
        }
      />
      <TabButton
        icon={<Palette className="h-6 w-6" />}
        label="Saturation"
        active={activeSubTab === "saturation"}
        onClick={() =>
          setActiveSubTab(activeSubTab === "saturation" ? "" : "saturation")
        }
      />
      <div className="flex-1">
        <Slider
          defaultValue={[100]}
          max={200}
          step={1}
          onValueChange={(value) => {
            if (value[0] === 100) {
              resetImage();
            } else {
              applyEdit((ctx, img) => {
                const imageData = ctx.getImageData(0, 0, img.width, img.height);
                const d = imageData.data;
                for (let i = 0; i < d.length; i += 4) {
                  if (activeSubTab === "brightness") {
                    d[i] = (d[i] * value[0]) / 100;
                    d[i + 1] = (d[i + 1] * value[0]) / 100;
                    d[i + 2] = (d[i + 2] * value[0]) / 100;
                  } else if (activeSubTab === "contrast") {
                    const factor =
                      (259 * (value[0] + 255)) / (255 * (259 - value[0]));
                    d[i] = factor * (d[i] - 128) + 128;
                    d[i + 1] = factor * (d[i + 1] - 128) + 128;
                    d[i + 2] = factor * (d[i + 2] - 128) + 128;
                  } else if (activeSubTab === "saturation") {
                    const gray =
                      0.2989 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2];
                    d[i] = gray + ((d[i] - gray) * value[0]) / 100;
                    d[i + 1] = gray + ((d[i + 1] - gray) * value[0]) / 100;
                    d[i + 2] = gray + ((d[i + 2] - gray) * value[0]) / 100;
                  }
                }
                ctx.putImageData(imageData, 0, 0);
              });
            }
          }}
        />
      </div>
    </div>
  );

  const FiltersTab = () => {
    const filters = [
      { name: "None", icon: Eraser },
      { name: "Grayscale", icon: Droplet },
      { name: "Sepia", icon: Paintbrush },
      { name: "Invert", icon: ImageIcon },
      { name: "Sharpen", icon: Scissors },
    ];

    return (
      <div className="flex items-center space-x-4">
        {filters.map((filter) => (
          <TabButton
            key={filter.name}
            icon={<filter.icon className="h-6 w-6" />}
            label={filter.name}
            active={activeSubTab === filter.name.toLowerCase()}
            onClick={() => {
              if (activeSubTab === filter.name.toLowerCase()) {
                setActiveSubTab("");
                resetImage();
              } else {
                setActiveSubTab(filter.name.toLowerCase());
                applyEdit((ctx, img) => {
                  const imageData = ctx.getImageData(
                    0,
                    0,
                    img.width,
                    img.height
                  );
                  const d = imageData.data;
                  for (let i = 0; i < d.length; i += 4) {
                    if (filter.name === "Grayscale") {
                      const gray =
                        0.2989 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2];
                      d[i] = d[i + 1] = d[i + 2] = gray;
                    } else if (filter.name === "Sepia") {
                      const r = d[i],
                        g = d[i + 1],
                        b = d[i + 2];
                      d[i] = Math.min(255, r * 0.393 + g * 0.769 + b * 0.189);
                      d[i + 1] = Math.min(
                        255,
                        r * 0.349 + g * 0.686 + b * 0.168
                      );
                      d[i + 2] = Math.min(
                        255,
                        r * 0.272 + g * 0.534 + b * 0.131
                      );
                    } else if (filter.name === "Invert") {
                      d[i] = 255 - d[i];
                      d[i + 1] = 255 - d[i + 1];
                      d[i + 2] = 255 - d[i + 2];
                    }
                    // Note: Sharpen filter is more complex and requires convolution, not implemented here
                  }
                  ctx.putImageData(imageData, 0, 0);
                });
              }
            }}
          />
        ))}
      </div>
    );
  };

  const TextTab = () => {
    const [text, setText] = useState("");
    const [color, setColor] = useState("#000000");
    const [align, setAlign] = useState("left");

    return (
      <div className="flex items-center space-x-4">
        <Input
          placeholder="Enter text"
          className="flex-1"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <TabButton
          icon={<AlignLeft className="h-6 w-6" />}
          label="Left"
          active={align === "left"}
          onClick={() => setAlign("left")}
        />
        <TabButton
          icon={<AlignCenter className="h-6 w-6" />}
          label="Center"
          active={align === "center"}
          onClick={() => setAlign("center")}
        />
        <TabButton
          icon={<AlignRight className="h-6 w-6" />}
          label="Right"
          active={align === "right"}
          onClick={() => setAlign("right")}
        />
        <Input
          type="color"
          className="w-12 h-10"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
        <Button
          onClick={() => {
            if (text) {
              applyEdit((ctx, img) => {
                ctx.font = "20px Arial";
                ctx.fillStyle = color;
                ctx.textAlign = align as CanvasTextAlign;
                const x =
                  align === "left"
                    ? 10
                    : align === "right"
                      ? img.width - 10
                      : img.width / 2;
                ctx.fillText(text, x, 30);
              });
            } else {
              resetImage();
            }
          }}
        >
          {text ? "Add Text" : "Reset"}
        </Button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Left sidebar */}
      <div className="w-20 bg-white shadow-md flex flex-col items-center py-4 space-y-6 z-10">
        <ImageWizardLogo edit={true} />
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
      <div className="flex-1">
        <div className="bg-white p-4 mb-6">{renderTabContent()}</div>
        <div className="p-8">
          <div
            ref={containerRef}
            className="bg-white rounded-lg shadow-md p-6 mb-6 flex items-center justify-center"
            style={{ height: "60vh" }}
          >
            <canvas ref={canvasRef} className="max-w-full max-h-full" />
          </div>
        </div>
      </div>

      {/* Right sidebar */}
      <div className="w-64 bg-white shadow-md p-4">
        <Button
          className="w-full mb-4"
          onClick={() => {
            if (canvasRef.current) {
              const link = document.createElement("a");
              link.download = "edited-image.png";
              link.href = editedImage || canvasRef.current.toDataURL();
              link.click();
            }
          }}
        >
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
