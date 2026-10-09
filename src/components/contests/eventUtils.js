export const splitEventsByStatus = (events, now = Date.now()) => {
  const groups = { ongoing: [], upcoming: [], past: [] };

  events.forEach((event) => {
    const startsAt = new Date(event.startDate).getTime();
    const endsAt = startsAt + Number(event.durationMinutes) * 60 * 1000;
    const status = event.status?.toUpperCase();

    if (["CANCELED", "CANCELLED", "COMPLETED"].includes(status)) {
      groups.past.push(event);
    } else if (status === "LIVE") {
      groups.ongoing.push(event);
    } else if (
      !Number.isFinite(startsAt) ||
      !Number.isFinite(endsAt) ||
      endsAt <= now
    ) {
      groups.past.push(event);
    } else if (startsAt > now) {
      groups.upcoming.push(event);
    } else {
      groups.ongoing.push(event);
    }
  });

  groups.ongoing.sort(
    (first, second) =>
      new Date(first.startDate).getTime() - new Date(second.startDate).getTime()
  );
  groups.upcoming.sort(
    (first, second) =>
      new Date(first.startDate).getTime() - new Date(second.startDate).getTime()
  );
  groups.past.sort(
    (first, second) =>
      new Date(second.startDate).getTime() - new Date(first.startDate).getTime()
  );

  return groups;
};

export const getEventHref = (event) => {
  if (event.type === "contest") {
    return `/contest/${event.slug}?type=contest&tab=info`;
  }
  return `/events/${event.slug}?type=${event.type || "event"}&tab=info`;
};
