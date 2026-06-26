type Props = {
  className?: string;
};

export function ProductHuntBadge({ className }: Props) {
  return (
    <a
      href="https://www.producthunt.com/products/resumecraft-6?embed=true&utm_source=badge-featured&utm_medium=badge&utm_campaign=badge-resumecraft-7"
      target="_blank"
      rel="noopener noreferrer"
      className={["ph-badge", className].filter(Boolean).join(" ")}
    >
      <img
        src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1179034&theme=dark&t=1782388477113"
        alt="ResumeCraft - Boost your resume with AI to land more interviews | Product Hunt"
        className="ph-badge__img"
        width="250"
        height="54"
      />
    </a>
  );
}
