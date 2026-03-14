import { IoCloseOutline } from "react-icons/io5";
import { FaStar } from "react-icons/fa";
import { useEffect, useState } from "react";

export const RatingReviewModal = ({ profile, setRatingModal, courseId }) => {
  ///all the states here
  const [currentRating, setCurrentRating] = useState(0);

  useEffect(() => {
    const ratedCourse = profile?.ratedCourses?.find(
      (course) => course.courseId == courseId,
    );

    if (ratedCourse) {
      setCurrentRating(ratedCourse?.rating);
    }
  }, [profile]);

  return (
    <div
      className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm"
      onClick={() => setRatingModal(false)}
    >
      <div
        className="w-[444px] rounded shadow-lg flex flex-col bg-gray-700"
        onClick={(e) => e.stopPropagation()}
      >
        {/* heading */}
        <div className="flex items-center justify-between border-b border-gray-200 p-3">
          <p>Add Review</p>
          <IoCloseOutline
            onClick={() => setRatingModal(false)}
            className="cursor-pointer"
          />
        </div>

        {/* profile */}
        <div className="flex justify-center gap-3 p-4">
          <div></div>

          <div className="flex flex-col">
            <p>
              {profile?.firstName} {profile?.lastName}
            </p>
            <p>Posting Publicly</p>
          </div>
        </div>

        {/* rating */}
        <div className="flex justify-center gap-1 pb-4">
          <FaStar
            className={
              currentRating >= 1
                ? "text-yellow-500 cursor-pointer"
                : "text-white cursor-pointer"
            }
          />
          <FaStar
            className={
              currentRating >= 2
                ? "text-yellow-500 cursor-pointer"
                : "text-white cursor-pointer"
            }
          />
          <FaStar
            className={
              currentRating >= 3
                ? "text-yellow-500 cursor-pointer"
                : "text-white cursor-pointer"
            }
          />
          <FaStar
            className={
              currentRating >= 4
                ? "text-yellow-500 cursor-pointer"
                : "text-white cursor-pointer"
            }
          />
          <FaStar
            className={
              currentRating >= 5
                ? "text-yellow-500 cursor-pointer"
                : "text-white cursor-pointer"
            }
          />
        </div>

        {/* review input */}
        <div className="">
          <p>
            Add Your Experience <span className="text-red-600">*</span>
          </p>
          <input type="text" />
        </div>

        {/* cancel and save button */}
        <div className="flex justify-end gap-3">
          <button onClick={() => setRatingModal(false)}>Cancel</button>
          <button>Save</button>
        </div>
      </div>
    </div>
  );
};
