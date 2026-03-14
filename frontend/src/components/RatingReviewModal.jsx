import { IoCloseOutline } from "react-icons/io5";
import { CiStar } from "react-icons/ci";

export const RatingReviewModal = ({ profile, setRatingModal }) => {
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
          <CiStar className="cursor-pointer" />
          <CiStar className="cursor-pointer" />
          <CiStar className="cursor-pointer" />
          <CiStar className="cursor-pointer" />
          <CiStar className="cursor-pointer" />
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
          <button>Cancel</button>
          <button>Save</button>
        </div>
      </div>
    </div>
  );
};
