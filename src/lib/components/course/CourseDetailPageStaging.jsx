import React, { useContext } from "react";

import { STRLContext } from "../../Context";
import MultiLangBody from "../multi-lang/MultiLangBody";
import MultiLangFieldMd from "../multi-lang/MultiLangFieldMd";
import MultiLangFieldImage from "../multi-lang/MultiLangFieldImage";
import MultiLangField from "../multi-lang/MultiLangField";
import { stopPropagation } from "../../utils/dom";

// Icons
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/solid";

// Images
import pageTopBg from "../../assets/image/page-top-bg.png";
import emptyCertificate from "../../assets/image/certificate.jpg";
import jobs from "../../assets/image/jobs.jpg";
import newLogo from "../../assets/image/newLogo.svg";

function CourseDetailPageStaging(props) {
  const {
    course: { getCoursePurchaseURL },
  } = useContext(STRLContext);
  const {
    courseData,
    multiLangData,
    multiLangKey = "",
    goToCategoryPage = () => {},
    payNow,
    courseModuleTopic,

    // If course is purchased
    isPurchased,
    viewCourse = () => {},
  } = props;

  const {
    courseId,
    displayName,
    categoryName,
    description,
    courseImg,
    cost,
    students_enrolled,
    liveClassDuration,
    nsqf_lvl,
    modules,
    partners,
    videoUrl,
    isMoodleCourse,
    subscription_cost,
    is_subscription,
    paymentType,

    // Payment Action
    handleOneTimeChange = () => {},
    handleInstallmentChange = () => {},

    // Demo class
    userHasRegisteredDemo,
    onViewDemoDetails = () => {},
    isDemoAvailable,
    onBookDemo = () => {},
  } = courseData || {};

  return (
    <MultiLangBody _key={multiLangKey} data={multiLangData}>
      <section>
        <div className="relative pt-32">
          <img
            src={pageTopBg}
            className="absolute top-0"
            alt=""
            style={{ zIndex: "-1" }}
          />
          <div className="content mx-auto bg-white" style={{ zIndex: "1" }}>
            <div className="flex justify-center">
              <div className="px-4 py-10 md:px-10 shadow-xl w-full">
                <div className="flex flex-between flex-col gap-5 md:flex-row">
                  <div className="w-full md:w-2/5">
                    <div class="relative">
                      <img
                        class="w-full object-cover object-center shadow-xl rounded-xl"
                        src={courseImg}
                        alt="course-img"
                      />
                      <div class="absolute top-4 left-2 font-semibold">
                        <button
                          className="bg-white text-xs font-semibold rounded-md p-1 shadow-lg border"
                          onClick={goToCategoryPage}
                        >
                          {categoryName}
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="w-full md:w-3/5">
                    <h2 className="text-2xl font-semibold leading-10 text-japanese_indigo mb-3">
                      <MultiLangField name="display_name">
                        {displayName}
                      </MultiLangField>
                    </h2>
                    <div className="mb-6 text-sm">
                      <div class="flex flex-row justify-between">
                        <div className="flex items-center">
                          <svg
                            stroke="currentColor"
                            fill="currentColor"
                            stroke-width="0"
                            viewBox="0 0 24 24"
                            class="text-orange mx-1"
                            height="1.4em"
                            width="1.4em"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path fill="none" d="M0 0h24v24H0z"></path>
                            <path
                              fill-rule="evenodd"
                              d="M16.67 13.13C18.04 14.06 19 15.32 19 17v3h4v-3c0-2.18-3.57-3.47-6.33-3.87z"
                            ></path>
                            <circle
                              cx="9"
                              cy="8"
                              r="4"
                              fill-rule="evenodd"
                            ></circle>
                            <path
                              fill-rule="evenodd"
                              d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4c-.47 0-.91.1-1.33.24a5.98 5.98 0 010 7.52c.42.14.86.24 1.33.24zM9 13c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4z"
                            ></path>
                          </svg>
                          <span className="ml-2">
                            {students_enrolled} students
                          </span>
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
                    </div>
                    <div className="text-md mb-3">
                      <span className="font-semibold text-japanese_indigo mr-3 ">
                        Course Structure:
                      </span>
                      <span>
                        {liveClassDuration
                          ? "Live Classes"
                          : "Self Paced Digital Content"}
                      </span>
                    </div>

                    {is_subscription && !isPurchased ? (
                      <>
                        <div className="text-md mb-3">
                          <span className="font-semibold text-japanese_indigo mr-3 ">
                            Course Payment type:
                          </span>
                          <span>
                            <RadioButton
                              label="One Time"
                              value={paymentType === "one-time"}
                              onChange={() => handleOneTimeChange()}
                            />
                            <RadioButton
                              label="Installment"
                              value={paymentType === "installment"}
                              onChange={() => handleInstallmentChange()}
                            />
                          </span>
                        </div>

                        <div className="text-md mb-3">
                          <span className="font-semibold text-japanese_indigo mr-3 ">
                            {paymentType == "one-time"
                              ? "Price:"
                              : "Installment Price:"}
                          </span>
                          <span>
                            {paymentType == "one-time"
                              ? `₹${cost}`
                              : paymentType == "installment"
                              ? `₹${subscription_cost}/Month upto 3 months`
                              : ""}
                          </span>
                        </div>
                      </>
                    ) : (
                      <div className="text-md mb-3">
                        <span className="font-semibold text-japanese_indigo mr-3 ">
                          Price:
                        </span>
                        <span>{`₹${cost}`}</span>
                      </div>
                    )}

                    {partners && (
                      <div>
                        <span className="font-semibold text-japanese_indigo mr-3 text-md">
                          Certification Partners:
                        </span>
                        <div className="mx-2 flex flex-wrap mt-3 mb-3">
                          {partners
                            .concat([{ logo: newLogo }])
                            .map(
                              (p) =>
                                (p && p.logo && (
                                  <img src={p.logo} className="h-6" />
                                )) ||
                                null
                            )}
                        </div>
                      </div>
                    )}
                    <div className="flex gap-3">
                      {isPurchased ? (
                        <button
                          className="w-full text-sm bg-red-dark hover:opacity-90 px-6 py-3 text-white rounded-lg md:w-auto"
                          onClick={viewCourse}
                        >
                          View course
                        </button>
                      ) : isMoodleCourse == false ? (
                        <button
                          onClick={(e) => {
                            stopPropagation(e);
                            payNow();
                          }}
                          className="w-full text-sm bg-red-dark hover:opacity-90 px-4 py-2 text-white rounded-lg md:w-auto"
                        >
                          <span>Get Enrolled for </span>
                          <span className="font-bold">
                            {cost > 0 &&
                            is_subscription &&
                            paymentType == "installment"
                              ? `₹ ${subscription_cost}`
                              : (cost > 0 &&
                                  is_subscription &&
                                  paymentType == "one-time") ||
                                (cost > 0 && !is_subscription)
                              ? `₹ ${cost}`
                              : "Free"}
                          </span>
                        </button>
                      ) : (
                        <a
                          href={getCoursePurchaseURL(courseId)}
                          onClick={stopPropagation}
                          target="_blank"
                        >
                          <button className="w-full text-sm bg-red-dark hover:opacity-90 px-4 py-2 text-white rounded-lg md:w-auto">
                            <span>Get Enrolled for </span>
                            <span className="font-bold">
                              {cost > 0 ? `₹ ${cost}` : "Free"}
                            </span>
                          </button>
                        </a>
                      )}
                      {!isPurchased &&
                        (userHasRegisteredDemo ? (
                          <button
                            onClick={() => onViewDemoDetails()}
                            className="text-sm bg-red-dark hover:opacity-90 px-4 py-2 text-white rounded-lg"
                          >
                            Show demo class details
                          </button>
                        ) : (
                          isDemoAvailable && (
                            <button
                              onClick={() => onBookDemo()}
                              className="text-sm bg-red-dark hover:opacity-90 px-4 py-2 text-white rounded-lg"
                            >
                              Book demo
                            </button>
                          )
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="mt-12">
        <div className="content mx-auto grid grid-cols-1 lg:grid-cols-2">
          <div className="mr-5">
            <div className="text-3xl blue-dark2 font-semibold leading-10 text-center mt-3">
              About the Course
            </div>
            <p>
              <MultiLangField name="description">{description}</MultiLangField>
            </p>
          </div>
          <div className="ml-5">
            <video autoPlay controls width="100%">
              <source src={videoUrl} />
            </video>
          </div>
        </div>
      </section>
      <section>
        <div className="content mx-auto bg-blue-grad px-4 py-10 md:px-10 mt-20">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div>
              <h2 className="text-3xl text-center mb-8 blue-dark2 font-semibold">
                Course Modules
              </h2>
              {isMoodleCourse == false
                ? courseModuleTopic && (
                    <div className="w-full p-2 mx-auto rounded-lg">
                      {courseModuleTopic.length > 0 &&
                        courseModuleTopic.map((module) => (
                          <Disclosure as="div">
                            {({ open }) => (
                              <>
                                <Disclosure.Button className="flex justify-between w-full p-3 text-sm font-medium text-left blue-dark2 bg-white rounded-lg focus:outline-none">
                                  <span
                                    className="text-japanese_indigo font-semibold"
                                    dangerouslySetInnerHTML={{
                                      __html: module.name,
                                    }}
                                  />
                                  {module.coursesec?.length > 0 && (
                                    <ChevronUpIcon
                                      className={`${
                                        open ? "transform rotate-180" : ""
                                      } w-5 h-5`}
                                    />
                                  )}
                                </Disclosure.Button>
                                {module.coursesec?.length > 0 && (
                                  <Disclosure.Panel className="px-2 pt-2 pb-1 text-sm text-gray-500 pr-0">
                                    <ul className="ml-3">
                                      {module.coursesec.map((item) => (
                                        <li
                                          className="bg-white rounded-lg p-3 mb-1 text-black"
                                          style={{ listStyle: "disc" }}
                                          dangerouslySetInnerHTML={{
                                            __html: item.name,
                                          }}
                                        />
                                      ))}
                                    </ul>
                                  </Disclosure.Panel>
                                )}
                              </>
                            )}
                          </Disclosure>
                        ))}
                    </div>
                  )
                : modules && (
                    <div className="w-full p-2 mx-auto rounded-lg">
                      {modules.length > 0 &&
                        modules.map((module) => (
                          <Disclosure as="div">
                            {({ open }) => (
                              <>
                                <Disclosure.Button className="flex justify-between w-full p-3 text-sm font-medium text-left blue-dark2 bg-white rounded-lg focus:outline-none">
                                  <span
                                    className="text-japanese_indigo font-semibold"
                                    dangerouslySetInnerHTML={{
                                      __html: module.name,
                                    }}
                                  />
                                  {module.modules?.length > 0 && (
                                    <ChevronUpIcon
                                      className={`${
                                        open ? "transform rotate-180" : ""
                                      } w-5 h-5`}
                                    />
                                  )}
                                </Disclosure.Button>
                                {module.modules?.length > 0 && (
                                  <Disclosure.Panel className="px-2 pt-2 pb-1 text-sm text-gray-500 pr-0">
                                    <ul className="ml-3">
                                      {module.modules.map((item) => (
                                        <li
                                          className="bg-white rounded-lg p-3 mb-1 text-black"
                                          style={{ listStyle: "disc" }}
                                          dangerouslySetInnerHTML={{
                                            __html: item.name,
                                          }}
                                        />
                                      ))}
                                    </ul>
                                  </Disclosure.Panel>
                                )}
                              </>
                            )}
                          </Disclosure>
                        ))}
                    </div>
                  )}
            </div>
            <div>
              <h2 className="text-3xl text-center mb-8 blue-dark2 font-semibold">
                Certificate You Will Get
              </h2>
              <div className="relative">
                <img src={emptyCertificate} className="w-full h-full" />
                <p
                  className="absolute w-full h-full top-0 left-0 text-center text-gray-600"
                  style={{
                    transform: "scale(0.6) translateY(50%)",
                  }}
                >
                  student of <b>XYZ Institute</b> has successfully
                  <br />
                  cleared the assessment for the job role of
                  <br />
                  <b>{displayName}</b>
                  <br />
                  conforming to National Skills Qualifications Framework Level -{" "}
                  {nsqf_lvl || "X"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="content mx-auto px-3 py-12 pt-20 md:px-16 shadow-2xl flex justify-content w-full">
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl font-semibold text-gray-800 blue-dark2 mb-5">
              Job / Work Opportunities:
            </h2>
            <div className="text-sm">
              <MultiLangFieldMd
                name="job_opportunities"
                defaultValue={
                  "Jobs and Opportunities are coming your way very soon. Stay tuned!\n"
                }
                editor={{
                  dims: {
                    width: "calc(100% - 20px)",
                    height: "calc(100% - 150px)",
                  },
                }}
              />
            </div>
            <button
              disabled={true}
              className="bg-orange opacity-60 text-white font-semibold rounded-md text-sm p-3 mt-10 w-full md:w-auto"
            >
              View Jobs
            </button>
          </div>
          <div className="w-full md:w-1/2">
            <div class="relative">
              <MultiLangFieldImage
                className="w-full object-cover object-center shadow-xl"
                src={jobs}
                name="jobs"
                alt="course-img"
              />
            </div>
          </div>
        </div>
      </section>
    </MultiLangBody>
  );
}

const RadioButton = ({ label, value, onChange }) => {
  return (
    <label className="mr-5">
      <input
        type="radio"
        className="mr-1"
        checked={value}
        onChange={onChange}
      />
      {label}
    </label>
  );
};

export default CourseDetailPageStaging;
