export default function ReviewCard({ review, className = '' }) {
  const formattedDate = new Date(review.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  return (
    <article className={`${className}`}>
      <div className="flex items-center gap-3">
        <img src={review.avatar || review.authorAvatar} alt="" className="h-12 w-12 rounded-full object-cover" />
        <div>
          <h4 className="font-semibold text-[#222222]">{review.author || review.name}</h4>
          <p className="text-sm text-[#717171]">{review.location || formattedDate}</p>
        </div>
      </div>
      <div className="mt-2 flex gap-0.5 text-sm">{'★'.repeat(review.rating)}</div>
      <p className="mt-3 text-[#222222] leading-relaxed">&ldquo;{review.text}&rdquo;</p>
    </article>
  );
}
