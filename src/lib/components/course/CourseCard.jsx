import React, { useContext, useEffect, useState } from "react";
import { stopPropagation } from "../../utils/dom";
import STRLService, { STRLContext } from "../../Context";

export default function CourseCard(props) {
  const {
    data: {
      courseId,
      displayName,
      categoryName,
      courseImg,
      cost,
      students_enrolled,
      digitalContentDuration,
      liveClassDuration,
      nsqf_lvl,
    },
    goToDetailPage,
    goToCategoryPage,
    // If course is purchased
    isPurchased,
    viewCourse = () => {},
  } = props;

  let course_type = "";
  let duration = "";

  if (digitalContentDuration && liveClassDuration) {
    course_type = digitalContentDuration;
    duration = liveClassDuration;
  } else if (digitalContentDuration) {
    course_type = "Self paced digital content";
    duration = digitalContentDuration;
  } else {
    course_type = "Live classes";
    duration = liveClassDuration;
  }

  return (
    <div
      className="relative flex flex-col rounded-lg shadow-lg overflow-hidden cursor-pointer mx-2"
      onClick={() =>
        STRLService.course.toggleCourseModal({
          data: props.data,
          goToCategoryPage,
          goToDetailPage,
        })
      }
    >
      <div>
        <div className="relative">
          <img
            className="h-56 w-full object-cover object-center shadow-xl"
            src={courseImg && courseImg.url ? courseImg.url : courseImg}
            alt="course-img"
          />
          <div className="absolute top-4 left-2">
            <button
              onClick={(e) => {
                if (goToCategoryPage) {
                  stopPropagation(e);
                  goToCategoryPage();
                }
              }}
              className="bg-white text-base rounded-lg p-2 shadow-lg border font-semibold"
            >
              {categoryName}
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-between h-full p-2">
        <div className="h-full">
          <h1
            className="text-2xl mt-6 mb-6 font-semibold text-gray-600"
            title={displayName}
          >
            {displayName}
          </h1>
        </div>

        <div className="w-full text-xl mx-auto">
          <div className="flex flex-row justify-between">
            <p className="">{course_type}</p>
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

        <div className="flex flex-row my-2 justify-between">
          <p className="flex flex-row items-center justify-center">
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 24 24"
              className="text-orange mx-1"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path>
              <path d="M13 7h-2v5.414l3.293 3.293 1.414-1.414L13 11.586z"></path>
            </svg>
            {duration} hours
          </p>

          <p className="flex flex-row items-center justify-center">
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 24 24"
              className="text-orange mx-1"
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
            {students_enrolled ? students_enrolled : "34,455 Students"}
          </p>
        </div>
      </div>

      <div className="w-full text-right px-2">
        <p className="text-japanese_indigo">See More Details &gt; </p>
      </div>

      <div className="flex item-center justify-center w-full">
        <div className="mt-6 bottom-0 mb-4">
          {isPurchased ? (
            <button
              className="w-full font-2xl bg-red-dark hover:opacity-90 px-6 py-3 text-white rounded-lg"
              onClick={viewCourse}
            >
              View course
            </button>
          ) : (
            <a
              href={STRLService.course.getCoursePurchaseURL(courseId)}
              onClick={stopPropagation}
              target="_blank"
            >
              <button className="w-full font-2xl bg-red-dark hover:opacity-90 px-6 py-3 text-white rounded-lg">
                <span>Get Enrolled for </span>
                <span className="font-bold">
                  {cost == 0 ? "Free" : cost ? `₹ ${cost}` : "6,000"}
                </span>
              </button>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}