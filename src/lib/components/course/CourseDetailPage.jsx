import React, { useMemo } from "react";
import MultiLangBody from "../multi-lang/MultiLangBody";
import MultiLangFieldMd from "../multi-lang/MultiLangFieldMd";
import MultiLangFieldImage from "../multi-lang/MultiLangFieldImage";
import MultiLangField from "../multi-lang/MultiLangField";
import CourseOverviewAndPurchaseFragment from "./CourseOverviewAndPurchaseFragment";

// Icons
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/solid";

// Images
import pageTopBg from "../../assets/image/page-top-bg.png";
import emptyCertificate from "../../assets/image/common-certificate.png";
import jobs from "../../assets/image/jobs.jpg";

function CourseDetailPage(props) {
  const {
    courseData,
    data,
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
    description,
    modules,
    certificateImageUrl,
    isMoodleCourse,
    partners,
  } = courseData || {};

  const videoURL = useMemo(() => {
    let { videoUrl } = courseData;
    if (!videoUrl) return "";
    return "https://www.youtube.com/embed/" + videoUrl.split("watch?v=")[1];
  }, [courseData.videoUrl]);

  return (
    <MultiLangBody _key={multiLangKey} data={multiLangData}>
      <section>
        <div className="relative pt-32">
          {/* <img
            src={pageTopBg}
            className="absolute top-0"
            alt=""
            style={{ zIndex: "-1" }}
          /> */}
          <div style={{ zIndex: "1" }}>
            <CourseOverviewAndPurchaseFragment
              courseData={courseData}
              onPaymentStarted={payNow}
              viewCourse={viewCourse}
              goToCategoryPage={goToCategoryPage}
              isPurchased={isPurchased}
            />
          </div>
        </div>
      </section>
      <section className="mt-12">
        <div
          className="grid grid-cols-1 lg:grid-cols-2"
          style={{
            gridTemplateColumns: videoURL
              ? "repeat(2, minmax(0, 1fr))"
              : "repeat(1, minmax(0, 1fr)",
          }}
        >
          <div className="mr-5">
            <div className="text-3xl blue-dark2 font-semibold leading-10  mt-3">
              About the Course
            </div>
            <MultiLangField name="description">
              <div
                className="list-wrapper mt-4"
                dangerouslySetInnerHTML={{
                  __html: description?.replace(/\n/g, "<br />"),
                }}
              />
            </MultiLangField>
          </div>
          {videoURL && (
            <div className="ml-5">
              <iframe
                width="560"
                height="315"
                src={videoURL}
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          )}
        </div>
      </section>
      <section>
        <div className="bg-blue-grad mt-20">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div>
              <h2 className="text-3xl mb-8 blue-dark2 font-semibold">
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
                                <Disclosure.Button className="flex justify-between w-full p-3 text-sm font-medium text-left blue-dark2 rounded-lg focus:outline-none">
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
                                  <Disclosure.Panel className="ml-6 px-2 pt-2 pb-1 text-sm text-gray-500 pr-0">
                                    <ul className="ml-3">
                                      {module.coursesec.map((item) => (
                                        <li
                                          className="rounded-lg p-3 mb-1 text-black"
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
                                <Disclosure.Button className="flex justify-between w-full p-3 text-sm font-medium text-left blue-dark2 rounded-lg focus:outline-none">
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
                                  <Disclosure.Panel className="ml-6 px-2 pt-2 pb-1 text-sm text-gray-500 pr-0">
                                    <ul className="ml-3">
                                      {module.modules.map((item) => (
                                        <li
                                          className="rounded-lg p-3 mb-1 text-black"
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

            {courseData.has_certificate === true && (
              <div>
                <h2 className="text-3xl text-center mb-8 blue-dark2 font-semibold">
                  Certificate You Will Get
                </h2>

                <div className="relative">
                  <img
                    src={
                      certificateImageUrl
                        ? certificateImageUrl
                        : emptyCertificate
                    }
                    className="w-full h-full"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      {partners.map((partnerId) => {
        if (partnerId.id !== 59) {
          return (
            <>
              <section>
                <div className="content mx-auto px-3 py-12 pt-20 md:px-16 flex justify-content w-full">
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
            </>
          );
        }
      })}
    </MultiLangBody>
  );
}

export default CourseDetailPage;
