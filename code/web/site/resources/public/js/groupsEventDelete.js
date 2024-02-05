function registerDeleteGroupEvent(tokenClient, eventId) {
  const buttons = document.querySelectorAll(".deleteEventFromGroup");

  buttons.forEach((button) => {
    button.addEventListener("click", handleClick);
  });

  async function handleClick() {
    const groupId = window.location.pathname.split("/").pop();

    const uriDelete = `/groups/${groupId}/events/${eventId}`;
    const options = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${tokenClient}`,
      },
    };

    const rsp = await fetch(uriDelete, options);
    if (rsp.ok) {
      alert(`Event with id ${eventId} deleted`);
      window.location = `/site/groups/${groupId}`;
    }
  }
}
