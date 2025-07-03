import React from "react";
import { useState, useContext } from "react";
import MultiLangField from "../multi-lang/MultiLangField";
import newLogo from "../../assets/image/newLogo.svg";
import { stopPropagation } from "../../utils/dom";
import { STRLContext } from "../../Context";

export default function CourseOverviewAndPurchaseFragment(props) {
  const {
    courseData,
    onPaymentStarted,
    viewCourse,
    goToCategoryPage,
    isPurchased,
  } = props;
  console.log("courseData@", courseData);
  const {
    displayName,
    categoryName,
    courseImg,
    cost,
    discount,
    students_enrolled,
    nsqf_lvl,
    partners,
    subscription_cost,
    is_subscription,
    interval,
    course_type,
    duration,
    isMoodleCourse,

    // Demo class
    userHasRegisteredDemo,
    onViewDemoDetails = () => {},
    isDemoAvailable,
    onBookDemo = () => {},
  } = courseData || {};

  const [payingBySubscription, setPayingBySubscription] = useState(false);
  const [paymentStarted, setPaymentStarted] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const {
    request: { s3Url },
  } = useContext(STRLContext);

  console.log("hey==", s3Url);
  console.log("courseData", courseData);

  return (
    <div className="flex justify-center">
      <div className="w-full">
        <div className="flex flex-between flex-col gap-5 md:flex-row">
          <div className="w-full md:w-2/5">
            <div class="relative">
              <img
                class="w-full object-cover object-center rounded-xl"
                src={
                  courseImg && courseImg
                    ? isMoodleCourse
                      ? courseImg
                      : s3Url + "/" + courseImg
                    : courseImg
                }
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
          <div className="w-full md:w-3/5 bg-white p-4 pl-8">
            <h2 className="text-2xl font-semibold leading-10 text-japanese_indigo mb-3">
              <MultiLangField name="display_name">{displayName}</MultiLangField>
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
                    <circle cx="9" cy="8" r="4" fill-rule="evenodd"></circle>
                    <path
                      fill-rule="evenodd"
                      d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4c-.47 0-.91.1-1.33.24a5.98 5.98 0 010 7.52c.42.14.86.24 1.33.24zM9 13c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4z"
                    ></path>
                  </svg>
                  <span className="ml-2">{students_enrolled} students</span>
                  <a
                    className="ml-6"
                    href="https://www.youtube.com/watch?v=riE-VMMXMHI"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="red-dark mr-2">NSQF</span>
                    <span>{nsqf_lvl || "NA"}</span>
                  </a>
                </div>
              </div>
            </div>
            <div className="text-md mb-3">
              <span className="font-semibold text-japanese_indigo mr-3 ">
                Course Structure:
              </span>
              <span>
                {course_type == 4
                  ? "External course"
                  : course_type == 3
                  ? "Physical Classes + Live Online Classes + Digital Content"
                  : course_type == 2
                  ? "Live Online Classes + Digital Content"
                  : course_type == 1
                  ? "Digital Content (Self Paced)"
                  : "Self Paced Digital Content"}
              </span>
            </div>
            {is_subscription && !isPurchased && (
              <div className="text-md mb-3">
                <span className="font-semibold text-japanese_indigo mr-3 ">
                  Course Payment type:
                </span>
                <span>
                  <RadioButton
                    label="One Time"
                    value={!payingBySubscription}
                    onChange={() => setPayingBySubscription(false)}
                  />
                  <RadioButton
                    label="Installment"
                    value={payingBySubscription}
                    onChange={() => setPayingBySubscription(true)}
                  />
                </span>
              </div>
            )}
            <div className="text-md mb-3">
              <span className="font-semibold text-japanese_indigo mr-3 ">
                {!payingBySubscription ? "Price:" : "Installment Price:"}
              </span>
              <span>
                {!payingBySubscription ? (
                  <>
                    <span className={discount ? "line-through mr-2" : ""}>
                      {cost > 0 ? `₹ ${cost}` : "Free"}
                    </span>
                    {Boolean(discount) && discount > 0 && (
                      <span>₹ {Number(cost) - Number(discount)}</span>
                    )}
                  </>
                ) : payingBySubscription ? (
                  `₹${subscription_cost}/Month Upto ${interval} Months`
                ) : (
                  ""
                )}
              </span>
            </div>
            {duration && (
              <div className="text-md mb-3">
                <span className="font-semibold text-japanese_indigo mr-3 ">
                  Course Duration:
                </span>
                <span>{duration}</span>
              </div>
            )}
            {partners && (
              <div>
                <span className="font-semibold text-japanese_indigo mr-3 text-md">
                  Certification Partners:
                </span>
                <div className="mx-2 flex flex-wrap mt-3 mb-3">
                  {partners
                    .map((p) => {
                      console.log("p==", p);
                      return {
                        logo: s3Url + "/" + p.logo,
                      };
                    })
                    .concat([{ logo: newLogo }])
                    .map(
                      (p) =>
                        (p && p.logo && (
                          <img src={p.logo} className="mr-3 h-9" />
                        )) ||
                        null
                    )}
                </div>
              </div>
            )}
            <div className="flex flex-col gap-3 mt-4">
              {isPurchased ? (
                <>
                  <button
                    className="w-full text-sm bg-red-dark hover:opacity-90 px-6 py-3 text-white rounded-lg md:w-1/4"
                    onClick={viewCourse}
                  >
                    View course
                  </button>

                  {courseData.modulesWithGrades &&
                    courseData.isNocnCourse &&
                    courseData.modulesWithGrades.length > 0 && (
                      <div className="pt-2">
                        <div className="">
                          <table className="min-w-full bg-gray-100 text-sm rounded-lg">
                            <thead>
                              <tr className="text-left text-japanese_indigo">
                                <th className="px-4 py-3 font-semibold border-b">
                                  Modules
                                </th>
                                <th className="px-4 py-3 font-semibold border-b">
                                  Grade
                                </th>
                                <th className="px-4 py-3 font-semibold border-b">
                                  Score
                                </th>
                                <th className="px-4 py-3 font-semibold border-b">
                                  Action
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {courseData.modulesWithGrades.map((mod) => (
                                <tr key={mod.id} className="border-b">
                                  <td className="px-4 py-3">{mod.name}</td>
                                  <td className="px-4 py-3">
                                    <span
                                      className={`font-bold ${
                                        mod.grade === "Pass"
                                          ? "text-green-600"
                                          : mod.grade === "Fail"
                                          ? "text-red-600"
                                          : "text-gray-500"
                                      }`}
                                    >
                                      {mod.grade}
                                    </span>
                                  </td>
                                  <td className="px-4 py-3">
                                    {mod.score ?? "-"}
                                  </td>
                                  <td className="px-4 py-3">
                                    {mod.canReattempt && (
                                      <>
                                        {mod?.reAttemptPaymentDone ? (
                                          <button
                                            onClick={() =>
                                              setShowSuccessPopup(true)
                                            }
                                            className="text-green-600 border border-green-600 font-semibold px-3 py-1 rounded-md hover:bg-green-50"
                                          >
                                            Take Test
                                          </button>
                                        ) : (
                                          <button
                                            onClick={() => {
                                              const searchParams =
                                                new URLSearchParams(
                                                  window.location.search
                                                );
                                              searchParams.set(
                                                "module_id",
                                                mod.id
                                              );

                                              const newUrl = `${
                                                window.location.pathname
                                              }?${searchParams.toString()}`;
                                              window.history.replaceState(
                                                null,
                                                "",
                                                newUrl
                                              );

                                              onPaymentStarted({
                                                payingBySubscription: false,
                                              });
                                            }}
                                            className="text-red-600 border border-red-600 font-semibold px-3 py-1 rounded-md hover:bg-red-50"
                                          >
                                            Payment for Re-attempt
                                          </button>
                                        )}
                                      </>
                                    )}
                                    "-"
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                </>
              ) : (
                <button
                  onClick={(e) => {
                    stopPropagation(e);
                    setPaymentStarted(true);
                    onPaymentStarted({
                      payingBySubscription,
                    })
                      .catch(() => {})
                      .then(setPaymentStarted);
                  }}
                  className="w-full text-sm bg-red-dark hover:opacity-90 px-4 py-2 text-white rounded-lg md:w-auto"
                  disabled={paymentStarted}
                >
                  {paymentStarted ? (
                    "Please wait..."
                  ) : !payingBySubscription ? (
                    <>
                      <span>Get Enrolled for </span>
                      <span
                        className={`font-bold ${
                          discount ? "line-through mr-2" : ""
                        }`}
                      >
                        {cost > 0 ? `₹ ${cost}` : "Free"}
                        {cost > 0 && !discount ? " + 18% GST " : ""}
                      </span>
                      {Boolean(discount) && discount > 0 && (
                        <span className="font-bold">
                          ₹ {Number(cost) - Number(discount)}
                          {Number(cost) - Number(discount) > 0
                            ? " + 18% GST"
                            : ""}
                        </span>
                      )}
                    </>
                  ) : (
                    <>
                      <span>Get Enrolled for </span>
                      <span className="font-bold">₹ {subscription_cost}</span>
                    </>
                  )}
                </button>
              )}
              {!isPurchased &&
                (userHasRegisteredDemo ? (
                  <button
                    onClick={() => onViewDemoDetails()}
                    className="text-sm bg-red-dark hover:opacity-90 px-4 py-2 text-white rounded-lg"
                  >
                    Show Demo Class Details
                  </button>
                ) : (
                  isDemoAvailable && (
                    <button
                      onClick={() => onBookDemo()}
                      className="text-sm bg-red-dark hover:opacity-90 px-4 py-2 text-white rounded-lg"
                    >
                      Book A Free Demo
                    </button>
                  )
                ))}
            </div>
            {showSuccessPopup && (
              <div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30"
                onClick={() => setShowSuccessPopup(false)}
              >
                <div className="bg-white p-6 rounded-xl shadow-xl text-center w-80 animate-fade-in">
                  <h2 className="text-xl font-bold text-japanese_indigo mb-2">
                    Take the test Now!
                  </h2>

                  <p className="text-sm text-gray-600 mb-4">
                    You’ll be redirected to the ESOL dashboard. <br />
                  </p>
                  <button
                    onClick={viewCourse}
                    className="bg-red-dark text-white font-semibold px-4 py-2 rounded-md w-2/3"
                  >
                    Go To ESOL Dashboard
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
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
