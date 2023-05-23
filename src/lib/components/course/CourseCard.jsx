import React, { useContext } from "react";
import { stopPropagation } from "../../utils/dom";
import { STRLContext } from "../../Context";

export default function CourseCard(props) {
  const {
    data: {
      courseId,
      displayName,
      categoryName,
      courseImg,
      cost,
      students_enrolled,
      discount,
      partners,
      nsqf_lvl,
      duration,
      isMoodleCourse,
      course_type,

      // Demo sessions
      userHasRegisteredDemo,
      onViewDemoDetails = () => {},
      isDemoAvailable,
      onBookDemo = () => {},
    },
    goToDetailPage,
    goToCategoryPage,
    payNow,

    // If course is purchased
    isPurchased,
    viewCourse = () => {},
  } = props;

  const {
    request: { s3Url },
  } = useContext(STRLContext);

  return (
    <div
      className="relative flex flex-col rounded-lg shadow-lg overflow-hidden cursor-pointer mx-2"
      onClick={goToDetailPage}
    >
      <div>
        <div className="relative">
          <div className="h-56 flex justify-center items-center bg-gray-200">
            <img
              className="max-w-full max-h-full shadow-xl"
              src={
                courseImg && courseImg
                  ? isMoodleCourse
                    ? courseImg
                    : s3Url + "/" + courseImg
                  : courseImg
              }
              alt={displayName}
            />
          </div>
          <div className="absolute top-2 left-2">
            <button
              onClick={(e) => {
                if (goToCategoryPage) {
                  stopPropagation(e);
                  goToCategoryPage();
                }
              }}
              className="bg-white text-xs rounded-lg p-2 shadow-lg border font-semibold"
            >
              {categoryName}
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-between h-full p-2">
        <div className="h-full">
          <h1
            className="text-lg mt-1 mb-6 font-semibold text-gray-600"
            title={displayName}
          >
            {displayName}
          </h1>
        </div>

        <div className="w-full text-sm mx-auto ">
          <div className="flex flex-row justify-between">
            <p className="flex flex-row justify-center">
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 24 24"
                className="text-orange mx-1 mt-1"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path fill="none" d="M0 0h24v24H0z"></path>
                <path
                  fillRule="evenodd"
                  d="M16.67 13.13C18.04 14.06 19 15.32 19 17v3h4v-3c0-2.18-3.57-3.47-6.33-3.87z"
                ></path>
                <circle cx="9" cy="8" r="4" fillRule="evenodd"></circle>
                <path
                  fillRule="evenodd"
                  d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4c-.47 0-.91.1-1.33.24a5.98 5.98 0 010 7.52c.42.14.86.24 1.33.24zM9 13c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4z"
                ></path>
              </svg>
              {students_enrolled || 0}
            </p>

            <a
              href="https://www.youtube.com/watch?v=riE-VMMXMHI"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange"
            >
              NSQF{" "}
              <span className="text-black">{nsqf_lvl ? nsqf_lvl : "NA"}</span>
            </a>
          </div>
        </div>

        <div className="flex flex-row mt-2 justify-between text-sm h-8 ">
          <p className="flex flex-row justify-center">
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 24 24"
              className="text-orange mx-1 mt-1"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path>
              <path d="M13 7h-2v5.414l3.293 3.293 1.414-1.414L13 11.586z"></path>
            </svg>
            {course_type == 3
              ? "Physical Classes + Live Online Classes + Digital Content"
              : course_type == 2
              ? "Live Online Classes + Digital Content"
              : course_type == 1
              ? "Digital Content (Self Paced)"
              : "Self Paced Digital Content"}
          </p>
        </div>
        <div className="flex flex-row  justify-between text-sm h-8 ">
          <p className="flex flex-row justify-center">
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 24 24"
              className="text-orange mx-1 mt-1"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path>
              <path d="M13 7h-2v5.414l3.293 3.293 1.414-1.414L13 11.586z"></path>
            </svg>
            {duration}
          </p>
        </div>
      </div>
      <div className="w-full text-right">
        <div className="flex flex-row ml-2 -mb-5">
          {partners &&
            partners.map((partner) => (
              <img
                src={partner.logo}
                className={"h-10 mr-4"}
                alt="Partner Text"
              />
            ))}{" "}
        </div>{" "}
        <p className="text-japanese_indigo text-sm mx-2">
          See More Details &gt;{" "}
        </p>
      </div>

      <div className="flex item-center justify-center w-full">
        <div className="mt-6 bottom-0 mb-4 flex gap-3">
          {
            isPurchased ? (
              <button
                className="text-sm bg-red-dark hover:opacity-90 px-6 py-3 text-white rounded-lg"
                onClick={viewCourse}
              >
                View course
              </button>
            ) : (
              <button
                onClick={(e) => {
                  stopPropagation(e);
                  payNow();
                }}
                className="text-sm bg-red-dark hover:opacity-90 px-4 py-2 text-white rounded-lg"
              >
                <span>Get Enrolled for </span>
                <span
                  className={`font-bold ${discount ? "line-through mr-2" : ""}`}
                >
                  {cost > 0 ? `₹ ${cost}` : "Free"}
                </span>
                {Boolean(discount) && (
                  <span className="font-bold">
                    ₹ {Number(cost) - Number(discount)}
                  </span>
                )}
              </button>
            )

            // : (
            //   <a
            //     href={getCoursePurchaseURL(courseId)}
            //     onClick={stopPropagation}
            //     target="_blank"
            //   >
            //     <button className="text-sm bg-red-dark hover:opacity-90 px-4 py-2 text-white rounded-lg">
            //       <span>Get Enrolled for </span>
            //       <span
            //         className={`font-bold ${discount ? "line-through mr-2" : ""}`}
            //       >
            //         {cost > 0 ? `₹ ${cost}` : "Free"}
            //       </span>
            //       {discount && (
            //         <span className="font-bold">
            //           ₹ {Number(cost) - Number(discount)}
            //         </span>
            //       )}
            //     </button>
            //   </a>
            // )
          }
          {/* Book demo button */}
          {!isPurchased &&
            (userHasRegisteredDemo ? (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onViewDemoDetails();
                }}
                className="text-sm bg-red-dark hover:opacity-90 px-4 py-2 text-white rounded-lg"
              >
                Show demo class details
              </button>
            ) : (
              isDemoAvailable && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onBookDemo();
                  }}
                  className="text-sm bg-red-dark hover:opacity-90 px-4 py-2 text-white rounded-lg"
                >
                  Book A Free Demo
                </button>
              )
            ))}
        </div>
      </div>
    </div>
  );
}
