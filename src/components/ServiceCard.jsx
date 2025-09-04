function ServiceCard({ service }) {
  return (
    <div className="flex justify-between gap-12 border-[1px] card">
      <div>{service.name}</div>
    </div>
  );
}

export default ServiceCard;
