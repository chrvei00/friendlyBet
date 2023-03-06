function DateFormat(props) {
  const date = new Date(Date.parse(props.date));
  return (
    <>
      {"  " +
        date.getHours() +
        ":" +
        date.getMinutes() +
        " - " +
        date.getDate()}
      /{date.getMonth() + 1}/{date.getFullYear()}
    </>
  );
}

export { DateFormat };
