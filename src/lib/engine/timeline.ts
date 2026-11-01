import { createEvents, type EventAttributes } from "ics";
import type { EventInput } from "../schemas";

export interface TimelineItem {
  task: string;
  daysBefore: number;
  date: string;
}

const TASKS: Record<EventInput["eventType"], Array<[string, number]>> = {
  wedding: [
    ["Book venue", 180],
    ["Confirm caterer and menu tasting", 120],
    ["Book photographer and DJ", 90],
    ["Send invitations", 60],
    ["Finalize decor and outfits", 30],
    ["Confirm guest count and vendor timings", 7],
    ["Pack essentials and confirm the run sheet", 1],
  ],
  birthday: [
    ["Book venue and core vendors", 60],
    ["Choose theme, menu, and activities", 30],
    ["Send invitations", 21],
    ["Confirm cake, decor, and entertainment", 14],
    ["Confirm guest count and vendor timings", 3],
    ["Prepare the event-day checklist", 1],
  ],
  community: [
    ["Confirm venue, permissions, and organizers", 90],
    ["Book food, sound, and accessibility support", 60],
    ["Publish event details and open registrations", 30],
    ["Confirm volunteers and safety plan", 14],
    ["Confirm attendance, supplies, and vendor timings", 3],
    ["Brief volunteers and check the venue", 1],
  ],
  other: [
    ["Confirm venue and essential vendors", 90],
    ["Finalize program, food, and accessibility needs", 45],
    ["Send invitations and logistics", 30],
    ["Confirm attendance and vendor timings", 7],
    ["Prepare the event-day checklist", 1],
  ],
};

function parseIsoDate(date: string): Date {
  const [year, month, day] = date.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day));
}

export function buildTimeline(input: EventInput): TimelineItem[] {
  const eventDate = parseIsoDate(input.date);
  return TASKS[input.eventType].map(([task, daysBefore]) => {
    const taskDate = new Date(eventDate);
    taskDate.setUTCDate(taskDate.getUTCDate() - daysBefore);
    return {
      task,
      daysBefore,
      date: taskDate.toISOString().slice(0, 10),
    };
  });
}

export function exportTimelineICS(
  input: EventInput,
  timeline = buildTimeline(input),
): Promise<string> {
  const events: EventAttributes[] = timeline.map((item) => {
    const [year, month, day] = item.date.split("-").map(Number);
    return {
      title: `${input.title}: ${item.task}`,
      description: `${item.daysBefore} days before ${input.title}. Jashn event checklist.`,
      start: [year, month, day],
      duration: { days: 1 },
      calName: "Jashn",
    };
  });

  return new Promise((resolve, reject) => {
    createEvents(events, (error, value) => {
      if (error) {
        reject(error);
      } else {
        resolve(value);
      }
    });
  });
}
