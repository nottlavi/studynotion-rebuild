import { IoCloseOutline } from "react-icons/io5";
import { FaStar } from "react-icons/fa";
import { useEffect, useState } from "react";

export const RatingReviewModal = ({ profile, setRatingModal, courseId }) => {
  ///all the states here
  //state to manage the rating which will be sent to the backend
  const [currentRating, setCurrentRating] = useState(0);
  const [currentReview, setCurrentReview] = useState("");
  //state to check if rating was really changed
  const [initialRating, setInitialRating] = useState(0);
  const [initialReview, setInitialReview] = useState("");

  const [unblockButton, setUnblockButton] = useState(false);

  ///all the useEffects here
  //use effect to change the rating states if profile or course is changed
  useEffect(() => {
    const ratedCourse = profile?.ratedCourses?.find(
      (course) => course.courseId == courseId,
    );

    if (ratedCourse) {
      setCurrentRating(ratedCourse?.rating || 0);
      setInitialRating(ratedCourse?.rating || 0);
      setInitialReview(ratedCourse?.review || "");
      setCurrentReview(ratedCourse?.review || "");
    }
  }, [profile, courseId]);

  //useEffect to toggle the changed state to unblock the save button only if rating of review is changed
  useEffect(() => {
    if (currentRating != initialRating || currentReview != initialReview) {
      setUnblockButton(true);
    } else {
      setUnblockButton(false);
    }
  }, [currentRating, currentReview, initialRating, initialReview]);

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
            onClick={() => {
              setCurrentRating(1);
            }}
          />
          <FaStar
            className={
              currentRating >= 2
                ? "text-yellow-500 cursor-pointer"
                : "text-white cursor-pointer"
            }
            onClick={() => {
              setCurrentRating(2);
            }}
          />
          <FaStar
            className={
              currentRating >= 3
                ? "text-yellow-500 cursor-pointer"
                : "text-white cursor-pointer"
            }
            onClick={() => {
              setCurrentRating(3);
            }}
          />
          <FaStar
            className={
              currentRating >= 4
                ? "text-yellow-500 cursor-pointer"
                : "text-white cursor-pointer"
            }
            onClick={() => {
              setCurrentRating(4);
            }}
          />
          <FaStar
            className={
              currentRating >= 5
                ? "text-yellow-500 cursor-pointer"
                : "text-white cursor-pointer"
            }
            onClick={() => {
              setCurrentRating(5);
            }}
          />
        </div>

        {/* review input */}
        <div className="">
          <p>
            Add Your Experience <span className="text-red-600">*</span>
          </p>
          <input
            type="text"
            value={currentReview}
            onChange={(e) => {
              setCurrentReview(e.target.value);
            }}
          />
        </div>

        {/* cancel and save button */}
        <div className="flex justify-end gap-3">
          <button onClick={() => setRatingModal(false)}>Cancel</button>
          <button disabled={!unblockButton}>Save</button>
        </div>
      </div>
    </div>
  );
};
