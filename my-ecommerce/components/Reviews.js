import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Send, User, MessageSquare, Loader2 } from "lucide-react";

export default function Reviews({ productId }) {
  const { data: session } = useSession();
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [hoverRating, setHoverRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (productId) {
      fetchReviews();
    }
  }, [productId]);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/reviews?productId=${productId}`);
      const data = await res.json();
      
      if (res.ok) {
        setReviews(data.reviews || []);
      } else {
        console.error("Failed to fetch:", data.error);
      }
    } catch (error) {
      console.error("Failed to fetch reviews:", error);
    }
    setLoading(false);
  };

  const submitReview = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!session) {
      setError("Please login first");
      return;
    }
    if (rating === 0) {
      setError("Please select a rating");
      return;
    }

    setSubmitting(true);
    console.log("Submitting review:", { productId, rating, comment });

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          productId, 
          rating: parseInt(rating), 
          comment 
        }),
      });

      const data = await res.json();
      console.log("Response:", data);

      if (res.ok) {
        setSuccess("Review submitted successfully!");
        setRating(0);
        setComment("");
        setShowForm(false);
        // Refresh reviews immediately
        await fetchReviews();
        
        // Clear success message after 3 seconds
        setTimeout(() => setSuccess(""), 3000);
      } else {
        setError(data.error || "Failed to submit review");
      }
    } catch (error) {
      console.error("Submit error:", error);
      setError("Network error. Please try again.");
    }
    
    setSubmitting(false);
  };

  const averageRating = reviews.length > 0 
    ? (reviews.reduce((acc, r) => acc + (r.rating || 0), 0) / reviews.length).toFixed(1)
    : "0.0";

  const getRatingCount = (star) => reviews.filter(r => r.rating === star).length;

  return (
    <div className="mt-12 pt-8 border-t border-slate-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          <MessageSquare size={24} className="text-indigo-600" />
          Customer Reviews
        </h3>
        {session && (
          <button
            onClick={() => {
              setShowForm(!showForm);
              setError("");
              setSuccess("");
            }}
            className="bg-indigo-600 text-white px-4 py-2 rounded-xl font-medium hover:bg-indigo-700 transition-colors"
          >
            {showForm ? "Cancel" : "Write a Review"}
          </button>
        )}
      </div>

      {/* Error/Success Messages */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="bg-rose-50 border-2 border-rose-200 text-rose-700 px-4 py-3 rounded-xl mb-4"
          >
            {error}
          </motion.div>
        )}
        {success && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="bg-emerald-50 border-2 border-emerald-200 text-emerald-700 px-4 py-3 rounded-xl mb-4"
          >
            {success}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Rating Summary */}
      <div className="flex items-center gap-6 mb-8 p-6 bg-slate-50 rounded-2xl">
        <div className="text-center">
          <div className="text-5xl font-bold text-slate-900">{averageRating}</div>
          <div className="flex gap-1 my-2 justify-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={20}
                className={star <= Math.round(averageRating) ? "text-amber-400 fill-amber-400" : "text-slate-300"}
              />
            ))}
          </div>
          <p className="text-sm text-slate-500">{reviews.length} reviews</p>
        </div>
        
        <div className="flex-1">
          {[5, 4, 3, 2, 1].map((star) => {
            const count = getRatingCount(star);
            const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
            
            return (
              <div key={star} className="flex items-center gap-3 mb-1">
                <span className="text-sm text-slate-600 w-12">{star} stars</span>
                <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-amber-400 rounded-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="text-sm text-slate-500 w-8 text-right">{count}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Review Form */}
      <AnimatePresence>
        {showForm && (
          <motion.form
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            onSubmit={submitReview}
            className="bg-white border-2 border-indigo-100 rounded-2xl p-6 mb-6 overflow-hidden"
          >
            <h4 className="font-bold text-slate-900 mb-4">Write Your Review</h4>
            
            <div className="flex gap-2 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="transition-transform hover:scale-110 focus:outline-none"
                >
                  <Star
                    size={32}
                    className={star <= (hoverRating || rating) ? "text-amber-400 fill-amber-400" : "text-slate-200"}
                  />
                </button>
              ))}
              <span className="ml-2 text-slate-600 self-center">
                {rating > 0 ? `${rating} stars` : "Select rating"}
              </span>
            </div>

            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your experience with this product..."
              className="w-full p-4 rounded-xl border-2 border-slate-200 focus:border-indigo-500 outline-none resize-none mb-4"
              rows={4}
            />

            <button
              type="submit"
              disabled={submitting}
              className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <><Loader2 className="animate-spin" size={18} /> Submitting...</>
              ) : (
                <><Send size={18} /> Submit Review</>
              )}
            </button>
          </motion.form>
        )}
      </AnimatePresence>

      {/* Reviews List */}
      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-12">
            <Loader2 className="animate-spin mx-auto text-indigo-600" size={32} />
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-12 bg-slate-50 rounded-2xl">
            <p className="text-slate-500">No reviews yet. Be the first to review!</p>
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            {reviews.map((review, index) => (
              <motion.div
                key={index}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white border border-slate-200 rounded-2xl p-6"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                      <User className="text-indigo-600" size={20} />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">{review.userName || "Anonymous"}</p>
                      <p className="text-xs text-slate-500">
                        {review.createdAt ? new Date(review.createdAt).toLocaleDateString() : "Recently"}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={16}
                        className={star <= review.rating ? "text-amber-400 fill-amber-400" : "text-slate-200"}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-slate-700 leading-relaxed">{review.comment}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}