import React, { useState } from "react";
import DashboardText from "../DashboardText";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import {
  IconButton,
  ButtonGroup,
  Spinner,
  Tooltip,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
} from "@material-tailwind/react";
import { useSelector } from "react-redux";
import { FetchAPI, bulkResumeAnalysisAPI } from "../../api";
import { errorToast, getRecruiterID, successToast } from "../../store/Slice";
import clsx from "clsx";
import { GrDocumentUser } from "react-icons/gr";
// Import the main component
import { Viewer } from "@react-pdf-viewer/core";
// Import the styles
import "@react-pdf-viewer/core/lib/styles/index.css";

function BulkResumes() {
  const { jobPostData } = useSelector((state) => state.API);
  const { mediaBaseURL } = useSelector((state) => state.hires);

  const [selectedJobPosition, setSelectedJobPosition] = useState("");
  const [candidateData, setCandidateData] = useState([]);

  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const recruiterID = getRecruiterID();

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [pdfID, setPdfID] = useState("");
  const [openPdf, setOpenPdf] = useState(false);
  const handleOpenPdf = (pdf) => {
    setPdfID(pdf);
    setOpenPdf(!openPdf)
  }

  const formSubmit = async (formData) => {
    setIsLoading(true);
    try {
      const form = new FormData();
      form.append("job_description_id", formData.job_description_id);
      form.append(
        "recruiter_bulk_resume_upload",
        formData.recruiter_bulk_resume_upload[0]
      );
      form.append("recruiter_user_id", recruiterID);

      const { data } = await FetchAPI(bulkResumeAnalysisAPI(), "POST", form);

      console.log(data);
      if (data?.Status === "success") {
        successToast(data.Message);
        setCandidateData(data.Data);
        setSelectedJobPosition("");
        reset();
      } else {
        errorToast(data?.Message);
      }
    } catch (error) {
      console.log("Error in jobDescriptionRegisterAPI", error);
    } finally {
      setIsLoading(false);
    }
  };

  const validateFile = (value) => {
    if (value.length === 0) {
      return "File is Required.";
    }
    const allowedTypes = ["application/x-zip-compressed"];
    if (!allowedTypes.includes(value[0].type)) {
      return "Only ZIP files is allowed.";
    }

    return true;
  };

  const onFileChange = (event) => {
    const uploadedFile = event.target.files[0];
    setFile(URL.createObjectURL(uploadedFile));
    // setOpen(true);
  };

  return (
    <div className="min-h-[120vh]">
      <DashboardText level1={"Job Description"} level2={"Bulk Resumes"} />

      <div className="mt-8">
        <h2 className="text-lg md:text-xl font-bold">Bulk Resumes</h2>
        <p className="text-gray-500">here the resumes</p>
      </div>

      <div className="mt-8 border border-gray-300 rounded-lg min-h-[25rem] p-6">
        <h3 className="font-medium text-lg">AI Recommendation</h3>

        <div className="mx-auto my-12 md:w-[60%] xl:w-[40%]">
          <form action="" onSubmit={handleSubmit(formSubmit)}>
            <div className="custom-border h-[12rem] w-full mx-auto flex items-center flex-col justify-center p-4 ">
              <p className=" text-[#353535]/50">File Supported: Zip File</p>
              <input
                type="file"
                name="bulk_resume"
                className="mt-3 bg-[#E2E2E2] w-full h-10 rounded-md file:bg-[#E2E2E2] file:h-full file:rounded-md file:px-3 file:border"
                {...register("recruiter_bulk_resume_upload", {
                  validate: validateFile,
                })}
                onChange={onFileChange}
              />
              {errors.recruiter_bulk_resume_upload && (
                <p className="text-red-600 me-auto">
                  {errors.recruiter_bulk_resume_upload.message}
                </p>
              )}
            </div>

            <div className="">
              <Controller
                name="job_description_id"
                control={control}
                defaultValue={null}
                rules={{ required: "Select a Job post." }}
                render={({ field }) => (
                  <Select
                    {...field}
                    className="capitalize"
                    onChange={(selectedOption) => {
                      setSelectedJobPosition(selectedOption);
                      field.onChange(
                        selectedOption ? selectedOption.value : null
                      );
                    }}
                    options={jobPostData?.map((position) => ({
                      value: position.job_description_id,
                      label: position.job_tilte,
                    }))}
                    value={selectedJobPosition}
                    isClearable
                    isSearchable
                    menuPortalTarget={document.body}
                    styles={{
                      placeholder: (baseStyle, state) => ({
                        ...baseStyle,
                        color: "rgb(189 189 189)",
                      }),
                      control: (baseStyles, state) => ({
                        ...baseStyles,
                        borderTop: "none",
                        borderBottom: "none",
                        padding: "5px",
                        boxShadow: "none",
                        borderColor: "#cccccc",
                        "&:hover": {
                          borderColor: "#cccccc",
                        },
                      }),
                      option: (baseStyles, state) => ({
                        ...baseStyles,
                        backgroundColor: state.isSelected
                          ? "#8893E0"
                          : baseStyles.backgroundColor,
                        textTransform: "capitalize",
                      }),
                      // menu: (baseStyles) => ({
                      //   ...baseStyles,
                      //   maxHeight: '200px', // Set your desired height here
                      //   overflowY: 'auto',  // Add a scrollbar if the content exceeds the maxHeight
                      // }),
                      menuList: (baseStyles) => ({
                        ...baseStyles,
                        maxHeight: "200px", // Ensure this matches the menu maxHeight
                        overflowY: "auto", // Enable vertical scrolling
                      }),
                    }}
                  />
                )}
              />
              {errors.job_description_id && (
                <p className="text-red-600">
                  {errors.job_description_id.message}
                </p>
              )}
            </div>
            <div className="">
              <button
                className={clsx(
                  " hover:bg-[#7581da] transition bg-[#8893E0] text-white w-full p-2 rounded-md",
                  isLoading ? "bg-[#8892e0cc]  pointer-events-none" : ""
                )}
              >
                {isLoading ? (
                  <>
                    <i className="fa-solid fa-circle-notch fa-spin"></i> Wait{" "}
                  </>
                ) : (
                  "AI Analysis"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {candidateData?.length > 0 && (
        <div className="mt-8">
          <h3 className="font-medium text-lg mb-3">AI Analysis Results</h3>
          <table className="w-full table-auto overflow-hidden border-spacing-0 border-separate border border-[#c8c0cf80] rounded-[10px]">
            <thead className="text-left shadow-custom">
              <tr>
                <td className="font-semibold border-b border-e  border-[#c8c0cf80] p-3 ps-6 xl:ps-20">
                  Candidate Name
                </td>
                <td className="font-semibold border-b border-e  border-[#c8c0cf80] p-3 ps-6 xl:ps-20">
                  AI Score
                </td>
                <td className="font-semibold border-b border-[#c8c0cf80] p-3 text-center">
                  Resume
                </td>
              </tr>
            </thead>
            <tbody>
              {candidateData.map((candidate, index) => {
                const isLast = index === candidateData.length - 1;
                const classes = isLast
                  ? "p-5"
                  : "p-5 border-b border-[#c8c0cf80]";
                return (
                  <tr key={index}>
                    {/* <td>{candidate.name}</td> */}
                    <td
                      className={clsx(
                        classes,
                        "border-e border-[#c8c0cf80] xl:ps-20 capitalize"
                      )}
                    >
                      candidate
                    </td>
                    <td
                      className={clsx(
                        classes,
                        "border-e border-[#c8c0cf80] xl:ps-20 capitalize"
                      )}
                    >
                      {candidate.aiCompPercentageScore} %
                    </td>
                    <td className={clsx(classes, "")}>
                      <div className="bg-[#8893E0]/10 w-10 h-10 rounded-full flex items-center justify-center mx-auto cursor-pointer">
                        <GrDocumentUser
                          className="text-[#8893E0] text-xl"
                          onClick={() =>
                            handleOpenPdf(candidate.recruiter_resume_candidate_file_path)
                          }
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

       {/* pdf file preview */}
       <Dialog open={openPdf} handler={handleOpenPdf} size="lg">
        <DialogHeader>Resume Preview</DialogHeader>
        <div>
          <DialogBody className="overflow-y-scroll h-[32rem] ">
            {pdfID && (
              <div>
                <Viewer fileUrl={`${mediaBaseURL}${pdfID}`} />
              </div>
            )}
          </DialogBody>
        </div>
      </Dialog>

    </div>
  );
}

export default BulkResumes;
