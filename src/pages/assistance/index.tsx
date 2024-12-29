import AppButton from "@/components/app-buttons/AppButton";
import AppLayout from "@/components/Layouts/AppLayout";
import React, { useEffect, useState } from "react";
import {
  IoBarChart,
  IoBookOutline,
  IoBriefcase,
  IoGlobeOutline,
  IoLanguageOutline,
  IoSchoolOutline,
} from "react-icons/io5";
import { LuAward, LuTarget } from "react-icons/lu";

function Assistance() {
  const [filters, setFilters] = useState({
    format: [],
    purpose: [],
    region: [],
  });

  const handleFilterChange = (value: any) => {
    setFilters(value);
  };

  const handleSubmit = (text: string) => {
    console.log("Analyzing resume with filters:", filters);
    console.log("Resume text:", text);
  };

  return (
    <div className="min-h-screen  p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Academic Resume Enhancer
          </h1>
          <p className="text-lg text-gray-600">
            Optimize your resume for international university applications
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">
            Select Filters For Resume
          </h2>
          <ResumeFilters onFilterChange={handleFilterChange} />
        </div>

        {/* AI Features */}
        <AIFeatures />

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ResumeInput onSubmit={handleSubmit} />

          {/* Output Section */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="mb-4">
              <h2 className="text-lg font-semibold mb-2">
                Enhanced Academic Resume
              </h2>
              <p className="text-sm text-gray-600">
                Your optimized academic resume will appear here
              </p>
            </div>
            <div className="min-h-[300px] p-2 flex items-center justify-center border-2 border-dashed border-gray-200 rounded-lg">
              <p className="text-gray-500">
                Submit your resume to see the enhanced version
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Assistance.Layout = AppLayout;
export default Assistance;

const features = [
  {
    icon: <IoSchoolOutline className="w-6 h-6" />,
    title: "Academic Alignment",
    description: "Align your resume with academic requirements",
  },
  {
    icon: <IoGlobeOutline className="w-6 h-6" />,
    title: "International Standards",
    description: "Format according to country-specific standards",
  },
  {
    icon: <LuTarget className="w-6 h-6" />,
    title: "University Targeting",
    description: "Customize for specific universities",
  },
  {
    icon: <IoBookOutline className="w-6 h-6" />,
    title: "Research Highlight",
    description: "Emphasize research experience and publications",
  },
  {
    icon: <IoBriefcase className="w-6 h-6" />,
    title: "Experience Optimization",
    description: "Highlight relevant academic experiences",
  },
  {
    icon: <IoLanguageOutline className="w-6 h-6" />,
    title: "Language Proficiency",
    description: "Showcase language skills effectively",
  },
  {
    icon: <LuAward className="w-6 h-6" />,
    title: "Achievement Focus",
    description: "Emphasize academic achievements and awards",
  },
  {
    icon: <IoBarChart className="w-6 h-6" />,
    title: "Impact Metrics",
    description: "Add quantifiable academic achievements",
  },
];

export function AIFeatures() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-8">
      {features.map((feature) => (
        <div
          key={feature.title}
          className="p-4 bg-white rounded-lg shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow"
        >
          <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-3">
            {feature.icon}
          </div>
          <h3 className="font-semibold mb-1">{feature.title}</h3>
          <p className="text-sm text-gray-600">{feature.description}</p>
        </div>
      ))}
    </div>
  );
}

const formatFilters = [
  { value: "ats", label: "ATS Friendly" },
  { value: "academic", label: "Academic" },
  { value: "research", label: "Research-focused" },
  { value: "international", label: "International" },
  { value: "scholarship", label: "Scholarship" },
];

const purposeFilters = [
  { value: "masters", label: "Master's Application" },
  { value: "phd", label: "PhD Application" },
  { value: "postdoc", label: "PostDoc Position" },
  { value: "research", label: "Research Position" },
];

const regionFilters = [
  { value: "usa", label: "USA" },
  { value: "uk", label: "UK" },
  { value: "europe", label: "Europe" },
  { value: "canada", label: "Canada" },
  { value: "australia", label: "Australia" },
];

export function ResumeFilters({
  onFilterChange,
}: {
  onFilterChange: (filters: {
    format: typeof formatFilters;
    purpose: typeof purposeFilters;
    region: typeof regionFilters;
  }) => void;
}) {
  const [selectedFilters, setSelectedFilters] = useState({
    format: [formatFilters[0]],
    purpose: [purposeFilters[0]],
    region: [regionFilters[0]],
  });

  useEffect(() => {
    onFilterChange(selectedFilters);
  }, [selectedFilters]);

  const onSelectFilter = (
    category: string,
    value:
      | (typeof formatFilters)[0]
      | (typeof purposeFilters)[0]
      | (typeof regionFilters)[0]
  ) => {
    switch (category) {
      case "format":
        if (selectedFilters.format.includes(value)) {
          if (selectedFilters.format.length <= 1) return;
          setSelectedFilters((prev) => ({
            ...prev,
            format: prev.format.filter((f) => f.value !== value.value),
          }));
        } else {
          setSelectedFilters((prev) => ({
            ...prev,
            format: [...prev.format, value],
          }));
        }
        break;
      case "purpose":
        if (selectedFilters.purpose.includes(value)) {
          if (selectedFilters.purpose.length <= 1) return;
          setSelectedFilters((prev) => ({
            ...prev,
            purpose: prev.purpose.filter((f) => f.value !== value.value),
          }));
        } else {
          setSelectedFilters((prev) => ({
            ...prev,
            purpose: [...prev.purpose, value],
          }));
        }
        break;
      case "region":
        if (selectedFilters.region.includes(value)) {
          if (selectedFilters.region.length <= 1) return;
          setSelectedFilters((prev) => ({
            ...prev,
            region: prev.region.filter((f) => f.value !== value.value),
          }));
        } else {
          setSelectedFilters((prev) => ({
            ...prev,
            region: [...prev.region, value],
          }));
        }
    }
  };

  return (
    <div className="space-y-6 select-none">
      <div>
        <h2 className="text-primary text-xl font-semibold my-2">
          Format Filters
        </h2>
        <div className="flex items-center gap-3 flex-wrap">
          {formatFilters.map((filter) => (
            <div
              key={filter.value}
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => onSelectFilter("format", filter)}
            >
              <p
                className={`${
                  selectedFilters.format.includes(filter)
                    ? "bg-primary text-white"
                    : "bg-gray-200 text-gray-600"
                } px-4 py-3 rounded-full text-xs font-medium`}
              >
                {filter.label}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h2 className="text-primary text-xl font-semibold my-2">
          Purpose Filters
        </h2>
        <div className="flex items-center gap-3 flex-wrap">
          {purposeFilters.map((filter) => (
            <div
              key={filter.value}
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => onSelectFilter("purpose", filter)}
            >
              <p
                className={`${
                  selectedFilters.purpose.includes(filter)
                    ? "bg-primary text-white"
                    : "bg-gray-200 text-gray-600"
                } px-4 py-3 rounded-full text-xs font-medium`}
              >
                {filter.label}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h2 className="text-primary text-xl font-semibold my-2">
          Region Filters
        </h2>
        <div className="flex items-center gap-3 flex-wrap">
          {regionFilters.map((filter) => (
            <div
              key={filter.value}
              className="flex items-center space-x-2 cursor-pointer "
              onClick={() => onSelectFilter("region", filter)}
            >
              <p
                className={`${
                  selectedFilters.region.includes(filter)
                    ? "bg-primary text-white"
                    : "bg-gray-200 text-gray-600"
                } px-4 py-3 rounded-full text-xs font-medium`}
              >
                {filter.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ResumeInput({
  onSubmit,
}: {
  onSubmit: (text: string) => void;
}) {
  const [text, setText] = useState("");

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Input Your Resume</h2>
        <p className="text-sm text-gray-600">
          Paste your resume text or upload a file
        </p>
      </div>

      <textarea
        placeholder="Paste your resume content here..."
        className="min-h-[300px] mb-4 w-full p-2 border border-gray-300 rounded-md"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <div className="flex justify-between items-center flex-wrap gap-3">
        <div>
          <input type="file" id="image" accept="image/*" className="hidden" />
          <label
            htmlFor="image"
            className="cursor-pointer flex items-center gap-2 border border-secondary/50 px-2 py-1 rounded-md max-w-60"
          >
            <span className="text-primary line-clamp-1">Upload Resume</span>
          </label>
        </div>
        <AppButton
          onClick={() => onSubmit(text)}
          title="Analyze Rsume"
          className="w-fit py-1"
        />
      </div>
    </div>
  );
}
