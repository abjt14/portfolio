import { data } from "./resume_data";

export default function Education() {
  return (
    <>
      <div className="flex justify-start items-center gap-1">
        <EducationIcon />
        <h2 className="font-medium">Education</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {data.education.map((study, index) => {
          const { school, degree, course, location, date } = study;
          return (
            <div
              key={"education-" + index}
              className="w-full flex flex-col pb-0 gap-4"
            >
              <div className="w-full flex flex-col justify-start items-start gap-0">
                <h3 className="font-medium text-balance">
                  {degree} in {course}
                </h3>
                <p className="text-sm text-neutral-500">
                  {school} / {date}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

function EducationIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className="size-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
      />
    </svg>
  );
}
