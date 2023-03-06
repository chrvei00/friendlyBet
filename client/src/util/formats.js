function DateFormat(props) {
  const date = new Date(Date.parse(props.date));
  const hours = ("0" + date.getUTCHours()).substr(-2);
  const minutes = ("0" + date.getUTCMinutes()).substr(-2);
  return (
    <>
      {"UTC:  " + hours + ":" + minutes + " - " + date.getUTCDate()}/
      {date.getUTCMonth() + 1}/{date.getUTCFullYear()}
    </>
  );
}

export { DateFormat };
