import React from "react";
import DashboardText from "../DashboardText";
import clsx from "clsx";
import { IconButton, ButtonGroup } from "@material-tailwind/react";
import { MdOutlineChevronLeft, MdOutlineChevronRight } from "react-icons/md";
import { GrDocumentUser } from "react-icons/gr";

const ActiveJob = [
  {
    candidateName: "Mohhmad Naif",
    years: "+13",
    gender: "Male",
    nationality: "https://flagpedia.net/data/flags/w702/sa.webp",
  },
  {
    candidateName: "Reema Saddy",
    years: "+10",
    gender: "Female",
    nationality: "https://flagpedia.net/data/flags/w702/sa.webp",
  },
  {
    candidateName: "John Smith",
    years: "+15",
    gender: "Male",
    nationality: "https://flagpedia.net/data/flags/w702/ca.webp",
  },
  {
    candidateName: "Kathryn Murphy",
    years: "+08",
    gender: "Female",
    nationality: "https://flagpedia.net/data/flags/w702/jo.webp",
  },
  {
    candidateName: "Ahmed Ali",
    years: "+07",
    gender: "Male",
    nationality: "https://flagpedia.net/data/flags/w702/sa.webp",
  },
];

function ViewAll() {
  const [active, setActive] = React.useState(1);

  const getItemProps = (index) => ({
    className:
      active === index
        ? "bg-[#8893E0]/10 text-[#8893E0] border-[#C8C0CF]/50 focus:shadow-none text-sm"
        : "border-[#C8C0CF]/50 text-[#C8C0CF] text-sm",
    onClick: () => setActive(index),
  });

  const next = () => {
    if (active === 4) return;

    setActive(active + 1);
  };

  const prev = () => {
    if (active === 1) return;

    setActive(active - 1);
  };
  return (
    <div>
      <div className="mt-6 overflow-auto">
        <table className=" w-full border-spacing-0 border-separate border border-[#c8c0cf80] rounded-[10px] text-black">
          <thead className="text-center shadow-custom ">
            <th className="border-b border-e  border-[#c8c0cf80] p-3 ">
              Candidate Name
            </th>
            <th className="border-b border-e  border-[#c8c0cf80] p-3">
              Years Of Experiance
            </th>
            <th className="border-b border-e  border-[#c8c0cf80] p-3">
              Nationality
            </th>
            <th className="border-b border-e  border-[#c8c0cf80] p-3">
              Gender
            </th>
            <th className="border-b border-[#c8c0cf80]  p-3">
              Resumes
            </th>
          </thead>
          <tbody className="">
            {ActiveJob?.map((item, index) => {
              const isLast = index === ActiveJob.length - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-[#c8c0cf80]";
              const male = "bg-[#74AAE5]/20 text-[#0065D2] ";
              const female = "bg-[#9E79DA]/20 text-[#5A00EB]  ";

              return (
                <tr key={index}>
                  <td className={clsx(classes, "border-e border-[#c8c0cf80] ps-6 xl:ps-20")}>
                    {item.candidateName}
                  </td>
                  <td className={clsx(classes, "border-e border-[#c8c0cf80] text-center")}>
                    {item.years}
                  </td>
                  <td className={clsx(classes, "border-e border-[#c8c0cf80] ")}>
                    <img
                      src={item.nationality}
                      alt=""
                      className="h-5 w-8 mx-auto"
                    />
                  </td>
                  <td className={clsx(classes, "border-e border-[#c8c0cf80]")}>
                    <div
                      className={clsx(
                        item.gender === "Male" ? male : female,
                        "mx-auto text-center py-1 w-[80px] text-sm rounded-full"
                      )}
                    >
                      {item.gender}
                    </div>
                  </td>
                  <td className={clsx(classes, " ")}>
                    <div className="bg-[#8893E0]/10 w-10 h-10 rounded-full flex items-center justify-center mx-auto cursor-pointer">
                      <GrDocumentUser className="text-[#8893E0] text-xl" />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-8 flex justify-end">
        <ButtonGroup variant="outlined">
          <IconButton className="border-[#C8C0CF]/50 text-sm text-[#C8C0CF] focus:shadow-none">
            <MdOutlineChevronLeft className="h-4 w-4" onClick={prev} />
          </IconButton>
          <IconButton {...getItemProps(1)}>1</IconButton>
          <IconButton {...getItemProps(2)}>2</IconButton>
          <IconButton {...getItemProps(3)}>3</IconButton>
          <IconButton {...getItemProps(4)}>4</IconButton>
          <IconButton className="border-[#C8C0CF]/50 text-sm text-[#C8C0CF] focus:shadow-none">
            <MdOutlineChevronRight className="h-4 w-4" onClick={next} />
          </IconButton>
        </ButtonGroup>
      </div>

      
    </div>
  );
}

export default ViewAll;
