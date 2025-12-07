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
import { FaArrowTurnUp } from "react-icons/fa6";
import SlotCounter from "react-slot-counter";
import { AppInput } from "@/components/app-inputs/AppInput";
import { Controller, useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Div from "@/components/animated-container/Div";
const counts = [
  {
    id: 1,
    title: "CV",
    count: 54,
  },
  {
    id: 2,
    title: "Recommendation Letter",
    count: 23,
  },
  {
    id: 3,
    title: "English Proficiency",
    count: 32,
  },
  {
    id: 4,
    title: "Cover Letter",
    count: 81,
  },
  {
    id: 5,
    title: "Others",
    count: 92,
  },
];

const DOC_TYPES = [
  {
    id: 1,
    title: "CV",
    description: "Your academic and professional history (1–2 pages).",
  },
  {
    id: 2,
    title: "SOP (Statement of Purpose)",
    description:
      "Explain your background, goals, and why you’re applying (usually 500–1,000 words).",
  },
  {
    id: 3,
    title: "Motivation Letter",
    description:
      "Explain why you want to apply for a scholarship (usually 500–1,000 words).",
  },
  {
    id: 4,
    title: "Cover Letter",
    description:
      "Explain why you want to apply for a scholarship (usually 500–1,000 words).",
  },
  {
    id: 5,
    title: "English Proficiency",
    description: "Your English proficiency level.",
  },
  {
    id: 6,
    title: "Recommendation Letter",
    description:
      "Explain why you want to apply for a scholarship (usually 500–1,000 words).",
  },
];

const assistanceSchema = Yup.object().shape({
  degree: Yup.string().required().min(3),
  country: Yup.string().required().min(3),
  program: Yup.string().required().min(3),
  targetedScholarship: Yup.string()
    .label("Targeted Scholarship")
    .required()
    .min(3),
  type: Yup.string()
    .required()
    .default(DOC_TYPES[0].title)
    .oneOf(DOC_TYPES.map((doc) => doc.title)),
  file: Yup.mixed<File>()
    .required("Document is required")
    .test(
      "PDF file of 4MB or less",
      "File can only be a PDF file of 4MB or less",
      (value) => {
        if (!value) return true;
        if (value.size > 4 * 1024 * 1024) return false;
        if (value.type !== "application/pdf") return false;
        return true;
      }
    ),
});

function Assistance() {
  const [hoveredDoc, setHoveredDoc] = useState<null | number>(null);

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      degree: "",
      country: "",
      program: "",
      targetedScholarship: "",
      type: DOC_TYPES[0].title,
      file: undefined,
    },
    resolver: yupResolver(assistanceSchema),
  });

  return (
    <div className="lg:px-32 md:px-20 sm:px-16 xs:px-12 px-6">
      {/* Hero Section */}

      <div className="border-2 border-black/50 py-12 lg:px-12 md:px-10 sm:px-8 px-6 rounded-[60px]  ">
        <div className="flex xl:flex-row flex-col xl:gap-10 gap-5 items-center justify-between z-10 relative">
          <Div animation="translateX">
            <h1 className="xl:text-[112px] lg:text-[84px] md:text-7xl sm:text-5xl text-4xl  font-bold leading-none ">
              ASSISTANCE
            </h1>
          </Div>
          <Div
            animation="-translateX"
            className="w-full flex"
            onClick={() => {
              document.getElementById("file")?.scrollIntoView({
                behavior: "smooth",
              });
            }}
          >
            <div className="flex-1 border-primary border-4 rounded-full md:py-6 py-3 xl:max-w-[auto] md:max-w-96  mx-auto flex items-center justify-center ">
              <p className="text-black font-semibold text-center sm:text-xl text-lg cursor-pointer">
                choose a document
              </p>
            </div>
          </Div>
        </div>

        <div className="flex items-center md:gap-10 sm:gap-8 gap-5 z-0 xl:-mt-6 mt-4 ">
          <img
            src="/images/p1.jpg"
            alt="people"
            className="xl:size-72 lg:size-60 md:size-48 sm:size-40 xs:size-36 size-16 rounded-full  object-cover"
          />
          <div className="flex-1 flex xl:gap-4 gap-2 items-end ">
            <h2 className=" xl:text-7xl lg:text-5xl md:text-4xl sm:text-3xl xs:text-2xl text-lg leading-none font-bold">
              MAKE IT BETTER AND PROFESSIONAL
            </h2>
            <FaArrowTurnUp className="xl:size-20 lg:size-16 size-12 md:block hidden mb-2 text-primary" />
          </div>
        </div>
      </div>
      {/* Counter */}
      <div className=" lg:-mt-10 mt-10 z-20 lg:mx-24 md:rounded-full rounded-3xl md:flex md:justify-between md:items-center grid xs:grid-cols-3 grid-cols-2 gap-x-10 sm:gap-y-10 gap-y-4 bg-gradient-to-tr from-primary/90 via-primary to-purple-500  text-white px-10 py-2">
        {counts.map((item, i) => (
          <div
            className={`flex items-center flex-col ${
              counts.length - 1 == i && "xs:col-span-1 col-span-2 self-center"
            }`}
            key={i}
          >
            <SlotCounter
              value={item.count}
              debounceDelay={i * 1.5}
              valueClassName="xl::text-5xl md:text-3xl sm:text-2xl text-xl font-extralight "
              numberClassName="xl:text-5xl md:text-3xl sm:text-2xl text-xl font-extralight "
              duration={2}
              speed={0.8}
            />
            <p className="sm:text-sm text-xs font-light text-center">
              {item.title}
            </p>
          </div>
        ))}
      </div>

      {/* Types of Document */}
      <div className="py-16">
        <div className="lg:flex flex-col  items-center gap-4 ">
          <h2 className="lg:text-4xl md:text-3xl sm:text-2xl text-xl font-semibold ">
            Six Types
          </h2>
          <div className="lg:block hidden flex-1 bg-black/90 h-1 "></div>
          <p className="lg:text-3xl md:text-2xl sm:text-xl text-lg font-medium ">
            Lorem ipsum dolor sit amet consectetur
          </p>
        </div>
        <div className="mt-8 lg:flex grid md:grid-cols-2 grid-cols-1 lg:items-center lg:justify-end lg:overflow-hidden">
          {DOC_TYPES.map((item, i) => (
            <div
              onMouseEnter={() => setHoveredDoc(item.id)}
              onMouseLeave={() => setHoveredDoc(null)}
              key={i}
              className={`lg:rounded-s-[80px] lg:rounded-none rounded-full bg-white border-2 border-black/50 flex-1 xl:h-40 sm:h-32 h-24 xl:px-16 px-7 flex flex-col justify-center hover:text-white text-black hover:bg-primary  ${
                hoveredDoc === item.id && item.id != 1
                  ? "lg:-ml-40 !rounded-[80px]"
                  : hoveredDoc === item.id && item.id == 1
                  ? "!rounded-[80px]"
                  : hoveredDoc && hoveredDoc - 1 == item.id && item.id != 1
                  ? "lg:-ml-20 0_5xl:rounded-none !rounded-[80px]"
                  : hoveredDoc && hoveredDoc + 1 == item.id
                  ? "lg:ml-0"
                  : item.id != 1
                  ? "lg:-ml-20 "
                  : ""
              } transition-all duration-300 ease-in-out`}
            >
              <div className="flex items-center lg:justify-center justify-start gap-4">
                <p className="text-4xl font-bold lg:min-w-[auto] min-w-20 lg:text-start text-end">
                  {item.id}
                </p>
                <p className="text-xs  ">{item.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Select Type of Document */}
      <div className="py-16" id="file">
        <div className="border border-black/50 rounded-[30px] py-12 md:px-12 sm:px-8 px-4  bg-white shadow-square shadow-black/40">
          <div className="mb-6">
            <h3 className=" text-5xl font-semibold text-center ">
              {watch("type")}
            </h3>
            <p className="text-2xl text-center">
              {
                DOC_TYPES.find((item) => item.title == watch("type"))
                  ?.description
              }
            </p>
          </div>

          <form onSubmit={handleSubmit((data) => console.log(data))}>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
              <div className="flex flex-col gap-2">
                <label>Degree</label>
                <div className="flex-1">
                  <AppInput
                    {...register("degree")}
                    error={errors.degree?.message}
                    placeholder="Enter your degree"
                    containerClass="border border-black/20"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label>Country</label>
                <div className="flex-1">
                  <AppInput
                    {...register("country")}
                    error={errors.country?.message}
                    placeholder="Enter your country"
                    containerClass="border border-black/20"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label>Program</label>
                <div className="flex-1">
                  <AppInput
                    {...register("program")}
                    error={errors.program?.message}
                    placeholder="Enter your program"
                    containerClass="border border-black/20"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label>Targeted Scholarship</label>
                <div className="flex-1">
                  <AppInput
                    {...register("targetedScholarship")}
                    error={errors.targetedScholarship?.message}
                    placeholder="Enter your targeted scholarship"
                    containerClass="border border-black/20"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="basis-1/2">
                  <Controller
                    name="type"
                    control={control}
                    render={({ field }) => (
                      <select
                        {...field}
                        className="p-2 rounded-md border border-black/20 w-full "
                      >
                        {/* <option value="Inquiry">Inquiry</option>
                        <option value="JOIN TEAM">JOIN TEAM</option> */}
                        {DOC_TYPES.map((item) => (
                          <option key={item.id} value={item.title}>
                            {item.title}
                          </option>
                        ))}
                      </select>
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="flex sm:flex-row flex-col justify-between sm:items-center">
              <div className="my-4">
                <Controller
                  name="file"
                  control={control}
                  render={({ field }) => (
                    <div>
                      <input
                        type="file"
                        id="file"
                        accept="application/pdf"
                        className="hidden"
                        onChange={(e) => {
                          if (e.target.files) {
                            field.onChange(e.target.files[0]);
                          }
                        }}
                      />
                      <label
                        htmlFor="file"
                        className="cursor-pointer flex items-center gap-2 border border-black/20 px-2 py-1 rounded-md sm:max-w-max sm:w-fit"
                      >
                        <span className="text-gray-400 line-clamp-1">
                          {field.value
                            ? field.value.name.toString().split("\\").pop()
                            : "Upload your " + watch("type")}
                        </span>
                      </label>
                    </div>
                  )}
                />
                {errors.file && (
                  <p className="text-red-500 text-[10px]  ml-1">
                    {errors.file.message}
                  </p>
                )}
              </div>
              <AppButton
                title="Upload"
                className="text-sm text-white font-semibold bg-primary px-6 py-2 sm:w-fit hover:bg-black/80 rounded-md"
              />
            </div>
          </form>
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
