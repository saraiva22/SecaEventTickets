function registerDeleteGroupEvent(tokenClient, eventId) {
  const buttons = document.querySelectorAll(".deleteEventFromGroup");

  buttons.forEach((button) => {
    button.addEventListener("click", handleClick);
  });
  console.log("button:", button);

  async function handleClick() {
    console.log("click");
    const groupId = window.location.pathname.split("/").pop();
    console.log(groupId);
    console.log(eventId);

    const uriDelete = `/groups/${groupId}/events/${eventId}`;
    const options = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${tokenClient}`,
      },
    };

    const rsp = await fetch(uriDelete, options);
    if (rsp.ok) {
      alert(`Task with id ${groupId} deleted`);
      window.location = `/site/groups/${groupId}`;
    }
  }
}
