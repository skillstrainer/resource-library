import React from "react";
import STRLService from "../../Context";
import Modal from "../shared/Modal";

const CourseModal = (props) => {
  const { isOpen, course, onClose, goToCategoryPage, goToDetailPage } = props;
  const {
    categoryName,
    displayName,
    courseImg,
    description,
    students_enrolled,
    digitalContentDuration,
    liveClassDuration,
    nsqf_lvl,
    cost,
  } = course || {};

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      innerContainer={{
        className:
          "w-full px-5 md:w-5/6 lg:w-3/4 font-Poppins rounded-xl shadow-xl",
        style: {
          maxWidth: "900px",
        },
      }}
    >
      {course && (
        <div className="p-0 md:p-3 font-Poppins">
          <div className="flex flex-between flex-col gap-8 md:flex-row">
            <div className="w-full md:w-1/2">
              <div class="relative">
                <img
                  class="w-full object-cover object-center shadow-xl rounded-xl"
                  src={courseImg}
                  alt="course-img"
                />
                <div class="absolute top-4 left-2">
                  <button
                    onClick={() => {
                      if (goToCategoryPage) {
                        onClose();
                        goToCategoryPage();
                      }
                    }}
                  >
                    <span class="bg-white text-sm rounded-lg p-2 shadow-lg border font-semibold">
                      {categoryName}
                    </span>
                  </button>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 text-sm">
              <h2 className="text-3xl font-semibold leading-10 text-japanese_indigo mb-6">
                {displayName}
              </h2>
              <div class="flex flex-row justify-between mb-6">
                <div className="flex items-center">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 24 24"
                    class="text-orange mx-1"
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
                  <span className="ml-2">{students_enrolled} students</span>
                </div>
                <a
                  href="https://www.youtube.com/watch?v=riE-VMMXMHI"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="red-dark mr-2">NSQF</span>
                  <span>{nsqf_lvl || "NA"}</span>
                </a>
              </div>
              <div className="text-md mb-1">
                <span className="font-semibold mr-3 text-japanese_indigo">
                  Course Structure:{" "}
                </span>
                <span>
                  {liveClassDuration
                    ? "Live Classes"
                    : "Self Paced Digital Content"}
                </span>
              </div>
              {digitalContentDuration && (
                <div className="text-md mb-3">
                  <span className="font-semibold mr-3 text-japanese_indigo">
                    Digital Content Duration:
                  </span>
                  <span>{digitalContentDuration} hours</span>
                </div>
              )}
              {liveClassDuration && (
                <div className="text-md mb-3">
                  <span className="font-semibold mr-3 ">
                    Live Class Duration:
                  </span>
                  <span>{liveClassDuration}</span>
                </div>
              )}
              <a
                href={STRLService.course.getCoursePurchaseURL(course.id)}
                target="_blank"
              >
                <button className="bg-orange hover:opacity-90 text-white text-sm font-semibold rounded-lg py-3 px-5 mt-6 w-full md:w-auto">
                  Get Enrolled for {cost ? `₹${cost} Only` : `Free`}
                </button>
              </a>
            </div>
          </div>
          {description && (
            <div>
              <h2 className="text-2xl font-semibold leading-10 text-japanese_indigo mt-8 mb-1">
                About the Course:
              </h2>
              <p>{description}</p>
            </div>
          )}
          <div className="flex flex-col md:flex-row justify-center pt-6 md:mt-3 text-sm">
            <button
              className="bg-japanese_indigo-light text-japanese_indigo font-semibold py-3 px-6 mx-3 my-2 rounded-lg"
              onClick={onClose}
            >
              Close
            </button>
            <button
              onClick={() => {
                if (goToDetailPage) {
                  goToDetailPage();
                  onClose();
                }
              }}
              className="bg-japanese_indigo-light text-japanese_indigo font-semibold py-3 px-6 mx-3 my-2 rounded-lg w-full md:w-auto"
            >
              See More Details
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default CourseModal;
