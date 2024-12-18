import { TState } from "@/redux";
import React from "react";
import { useSelector } from "react-redux";
import DatePicker from "../app-date-picker/AppDatePicker";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import AppButton from "../app-buttons/AppButton";
import http, { API_URL } from "@/services/http.services";

const exportSchema = Yup.object().shape({
  start_date: Yup.date().required().label("Start Date"),
  end_date: Yup.date()
    .required()
    .label("End Date")
    .test({
      name: "startDateBeforeEndDate",
      message: "End Date must be after Start Date",
      test: (value, context) => {
        return new Date(value) > new Date(context.parent.start_date);
      },
    }),
});

export default function ExportModal() {
  const [loader, setLoader] = React.useState(false);
  const type = useSelector((state: TState) => state.modal.data.type) as
    | "Contacts"
    | "Team Joins";

  const {
    formState: { errors },
    control,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(exportSchema),
  });

  const downloadReport = async (values: {
    start_date: Date;
    end_date: Date;
  }) => {
    try {
      setLoader(true);
      const resp = await http.get(API_URL.EXPORT_REPORT, {
        params: {
          type,
          start_date: values.start_date,
          end_date: values.end_date,
        },
      });
      if (resp.status == 200) {
        const blob = new Blob([resp.data], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${type}.csv`;
        link.click();
      }
    } catch (error) {
      console.log("error while downloading report", error);
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="bg-white py-3 px-4 rounded-md w-[95vw] max-w-screen-sm ">
      <h1 className="text-lg font-semibold mb-4">CSV Export For {type}</h1>
      <form onSubmit={handleSubmit(downloadReport)}>
        <div className="flex gap-4">
          <div className="basis-1/2">
            <label htmlFor="start_date">Start Date</label>
            <Controller
              name="start_date"
              control={control}
              render={({ field }) => (
                <DatePicker
                  className="border border-secondary/50 py-2"
                  value={field.value}
                  onChange={(value) =>
                    field.onChange(
                      new Date(new Date(value).setHours(0, 0, 0, 0))
                    )
                  }
                />
              )}
            />
            {errors.start_date && (
              <p className="text-red-500 text-[10px]  ml-1">
                {errors.start_date.message}
              </p>
            )}
          </div>
          <div className="basis-1/2">
            <label htmlFor="end_date">End Date</label>
            <Controller
              name="end_date"
              control={control}
              render={({ field }) => (
                <DatePicker
                  className="border border-secondary/50 py-2"
                  value={field.value}
                  onChange={(value) =>
                    field.onChange(
                      new Date(new Date(value).setHours(23, 59, 59, 0))
                    )
                  }
                />
              )}
            />
            {errors.end_date && (
              <p className="text-red-500 text-[10px]  ml-1">
                {errors.end_date.message}
              </p>
            )}
          </div>
        </div>
        <AppButton title="Export" className="my-4" loader={loader} />
      </form>
    </div>
  );
}
