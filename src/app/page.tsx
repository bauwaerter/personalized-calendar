"use client";

import React, { useState, ChangeEvent } from "react";
import { Calendar, Download, Gift, Star } from "lucide-react";

// Define types for our application
interface UserInfo {
  name: string;
  birthday: string;
  height: string;
  weight: string;
  favoriteColor: string;
  favoriteFood: string;
  hobbies: string;
  achievements: string;
  dreams: string;
  personality: string;
}

interface CelebrationEvent {
  date: Date;
  summary: string;
  description: string;
}

interface CelebrationIdea {
  summary: string;
  description: string;
}

// Define the celebration ideas type structure
type CelebrationIdeasType = {
  heightDay: (height: string) => CelebrationIdea;
  weightBalanceDay: (weight: string) => CelebrationIdea;
  colorDay: (color: string) => CelebrationIdea;
  foodFestival: (food: string) => CelebrationIdea;
  hobbyHighlight: (hobbies: string) => CelebrationIdea;
  achievementDay: (achievements: string) => CelebrationIdea;
  dreamDay: (dreams: string) => CelebrationIdea;
  personalityDay: (personality: string) => CelebrationIdea;
  nameDay: (name: string) => CelebrationIdea;
  halfBirthday: (birthday: string) => CelebrationIdea;
  quarterBirthday: (birthday: string) => CelebrationIdea;
  personalNewYear: (birthday: string) => CelebrationIdea;
};

const PersonalizedCalendarApp: React.FC = () => {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: "",
    birthday: "",
    height: "",
    weight: "",
    favoriteColor: "",
    favoriteFood: "",
    hobbies: "",
    achievements: "",
    dreams: "",
    personality: "",
  });

  const [calendarGenerated, setCalendarGenerated] = useState<boolean>(false);
  const [generatingCalendar, setGeneratingCalendar] = useState<boolean>(false);
  const [previewEvents, setPreviewEvents] = useState<CelebrationEvent[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  // Event idea generators - each returns a celebration idea
  const celebrationIdeas: CelebrationIdeasType = {
    heightDay: (height: string): CelebrationIdea => ({
      summary: "Your Height Appreciation Day",
      description: `Today we celebrate that you are ${height}cm tall! Your unique height gives you a special perspective on the world.`,
    }),

    weightBalanceDay: (weight: string): CelebrationIdea => ({
      summary: "Body Strength Day",
      description: `Celebrate your body's strength today! At ${weight}kg, your body carries you through all of life's adventures.`,
    }),

    colorDay: (color: string): CelebrationIdea => ({
      summary: `${color} Appreciation Day`,
      description: `Today is all about your favorite color: ${color}! Wear it, eat foods of this color, or just appreciate it around you.`,
    }),

    foodFestival: (food: string): CelebrationIdea => ({
      summary: `${food} Festival Day`,
      description: `Today's the perfect day to enjoy your favorite food: ${food}! Take time to savor what you love.`,
    }),

    hobbyHighlight: (hobbies: string): CelebrationIdea => {
      const hobbyList = hobbies.split(",").map((h) => h.trim());
      const randomHobby =
        hobbyList[Math.floor(Math.random() * hobbyList.length)];
      return {
        summary: `${randomHobby} Celebration Day`,
        description: `Today is dedicated to your love of ${randomHobby}. Take time to enjoy this hobby you're passionate about!`,
      };
    },

    achievementDay: (achievements: string): CelebrationIdea => {
      const achievementList = achievements.split(",").map((a) => a.trim());
      const randomAchievement =
        achievementList[Math.floor(Math.random() * achievementList.length)];
      return {
        summary: "Achievement Celebration Day",
        description: `Today we honor your accomplishment: ${randomAchievement}. Be proud of how far you've come!`,
      };
    },

    dreamDay: (dreams: string): CelebrationIdea => {
      const dreamList = dreams.split(",").map((d) => d.trim());
      const randomDream =
        dreamList[Math.floor(Math.random() * dreamList.length)];
      return {
        summary: "Dream Visualization Day",
        description: `Today, focus on your dream of ${randomDream}. Visualize it, plan for it, take a step toward it!`,
      };
    },

    personalityDay: (personality: string): CelebrationIdea => {
      const traits = personality.split(",").map((p) => p.trim());
      const randomTrait = traits[Math.floor(Math.random() * traits.length)];
      return {
        summary: `${randomTrait} Appreciation Day`,
        description: `Today, celebrate your ${randomTrait} trait! This quality makes you uniquely you.`,
      };
    },

    nameDay: (name: string): CelebrationIdea => ({
      summary: "Your Name Day",
      description: `Today we celebrate the uniqueness of your name: ${name}! Your name carries your identity and story.`,
    }),

    halfBirthday: (birthday: string): CelebrationIdea => {
      const date = new Date(birthday);
      const halfBirthdayDate = new Date(date);
      halfBirthdayDate.setMonth((date.getMonth() + 6) % 12);

      return {
        summary: "Your Half-Birthday",
        description:
          "Halfway to your next birthday! A perfect excuse to celebrate you again.",
      };
    },

    quarterBirthday: (birthday: string): CelebrationIdea => {
      return {
        summary: "Quarter Birthday Milestone",
        description:
          "Another quarter around the sun since your birthday! A small milestone worth celebrating.",
      };
    },

    personalNewYear: (birthday: string): CelebrationIdea => {
      return {
        summary: "Your Personal New Year",
        description:
          "This day marks exactly one year since your last birthday! Time to reflect on your personal growth.",
      };
    },
  };

  // Special date-related events that need to be on specific days
  const specialDateEvents = (
    currentDate: Date,
    userBirthday: string,
  ): CelebrationIdea[] => {
    const events: CelebrationIdea[] = [];
    const birthday = new Date(userBirthday);

    // Actual birthday
    if (
      currentDate.getMonth() === birthday.getMonth() &&
      currentDate.getDate() === birthday.getDate()
    ) {
      events.push({
        summary: `${userInfo.name}'s Birthday Celebration`,
        description:
          "Today is your special day! The world is celebrating YOU today.",
      });
    }

    // Half birthday (6 months from birthday)
    const halfBirthdayDate = new Date(birthday);
    halfBirthdayDate.setMonth((birthday.getMonth() + 6) % 12);

    if (
      currentDate.getMonth() === halfBirthdayDate.getMonth() &&
      currentDate.getDate() === halfBirthdayDate.getDate()
    ) {
      events.push(celebrationIdeas.halfBirthday(userBirthday));
    }

    // Quarter birthdays (3 and 9 months from birthday)
    const quarterBirthdayDate1 = new Date(birthday);
    quarterBirthdayDate1.setMonth((birthday.getMonth() + 3) % 12);

    const quarterBirthdayDate2 = new Date(birthday);
    quarterBirthdayDate2.setMonth((birthday.getMonth() + 9) % 12);

    if (
      (currentDate.getMonth() === quarterBirthdayDate1.getMonth() &&
        currentDate.getDate() === quarterBirthdayDate1.getDate()) ||
      (currentDate.getMonth() === quarterBirthdayDate2.getMonth() &&
        currentDate.getDate() === quarterBirthdayDate2.getDate())
    ) {
      events.push(celebrationIdeas.quarterBirthday(userBirthday));
    }

    return events;
  };

  const generateEvents = (): CelebrationEvent[] => {
    // This function generates a celebration for every day of the year
    const events: CelebrationEvent[] = [];
    const today = new Date();
    const startDate = new Date(today.getFullYear(), 0, 1); // January 1st of current year
    const endDate = new Date(today.getFullYear(), 11, 31); // December 31st

    // Create array of all celebration generators that we'll rotate through
    type GeneratorFunction = () => CelebrationIdea;
    const celebrationGenerators: GeneratorFunction[] = [
      () => celebrationIdeas.heightDay(userInfo.height),
      () => celebrationIdeas.weightBalanceDay(userInfo.weight),
      () => celebrationIdeas.colorDay(userInfo.favoriteColor),
      () => celebrationIdeas.foodFestival(userInfo.favoriteFood),
      () => celebrationIdeas.hobbyHighlight(userInfo.hobbies),
      () => celebrationIdeas.achievementDay(userInfo.achievements),
      () => celebrationIdeas.dreamDay(userInfo.dreams),
      () => celebrationIdeas.personalityDay(userInfo.personality),
      () => celebrationIdeas.nameDay(userInfo.name),
    ];

    // Remove any generators that wouldn't work due to missing user info
    const validGenerators = celebrationGenerators.filter((generator) => {
      try {
        const result = generator();
        return result.description && !result.description.includes("undefined");
      } catch (e) {
        return false;
      }
    });

    // Generate events for each day of the year
    for (
      let d = new Date(startDate);
      d <= endDate;
      d.setDate(d.getDate() + 1)
    ) {
      const currentDate = new Date(d);

      // Check for special date-related events first (birthday, etc.)
      const specialEvents = userInfo.birthday
        ? specialDateEvents(currentDate, userInfo.birthday)
        : [];

      if (specialEvents.length > 0) {
        events.push({
          date: new Date(currentDate),
          ...specialEvents[0],
        });
      } else {
        // Use the celebration generator based on the day of the year
        const dayOfYear = Math.floor(
          (currentDate.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000),
        );
        const generatorIndex = dayOfYear % validGenerators.length;

        try {
          const event = validGenerators[generatorIndex]();
          events.push({
            date: new Date(currentDate),
            ...event,
          });
        } catch (e) {
          // If a generator fails, use a generic celebration
          events.push({
            date: new Date(currentDate),
            summary: "Your Special Day",
            description: `Today is day ${dayOfYear + 1} of the year, and it's special because you're in it!`,
          });
        }
      }
    }

    return events;
  };

  const formatToICalendar = (events: CelebrationEvent[]): string => {
    let icalContent = "BEGIN:VCALENDAR\r\n";
    icalContent += "VERSION:2.0\r\n";
    icalContent += "PRODID:-//DailyCelebrationCalendar//EN\r\n";
    icalContent += `X-WR-CALNAME:${userInfo.name}'s Daily Celebration Calendar\r\n`;

    events.forEach((event) => {
      icalContent += "BEGIN:VEVENT\r\n";

      // Create a unique identifier
      icalContent += `UID:${event.date.getTime()}-${Math.random().toString(36).substring(2, 9)}@celebrationcalendar.app\r\n`;

      // Format dates to iCalendar format
      const formatDate = (date: Date): string => {
        return date
          .toISOString()
          .replace(/[-:]/g, "")
          .replace(/\.\d{3}/, "");
      };

      // Set the event to all-day by using just the date without time
      const dateString = event.date
        .toISOString()
        .split("T")[0]
        .replace(/-/g, "");

      icalContent += `DTSTAMP:${formatDate(new Date())}\r\n`;
      icalContent += `DTSTART;VALUE=DATE:${dateString}\r\n`;
      icalContent += `DTEND;VALUE=DATE:${dateString}\r\n`;

      icalContent += `SUMMARY:${event.summary}\r\n`;
      icalContent += `DESCRIPTION:${event.description}\r\n`;

      icalContent += "END:VEVENT\r\n";
    });

    icalContent += "END:VCALENDAR";
    return icalContent;
  };

  const handleSubmit = (): void => {
    setGeneratingCalendar(true);

    // Generate preview events for display
    const allEvents = generateEvents();

    // Just take a few random events for preview
    const randomEvents: CelebrationEvent[] = [];
    for (let i = 0; i < 5; i++) {
      const randomIndex = Math.floor(Math.random() * allEvents.length);
      randomEvents.push(allEvents[randomIndex]);
    }

    setPreviewEvents(randomEvents);

    // Simulate processing time
    setTimeout(() => {
      setCalendarGenerated(true);
      setGeneratingCalendar(false);
    }, 1500);
  };

  const downloadCalendar = (): void => {
    const events = generateEvents();
    const icalContent = formatToICalendar(events);

    // Create a Blob and generate download link
    const blob = new Blob([icalContent], { type: "text/calendar" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${userInfo.name}_celebration_calendar.ics`;
    document.body.appendChild(a);
    a.click();

    // Clean up
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "long", day: "numeric" });
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <header className="bg-purple-600 p-4 text-white">
        <div className="container mx-auto flex items-center">
          <Gift className="mr-3 h-8 w-8" />
          <h1 className="text-2xl font-bold">Daily Celebration Calendar</h1>
        </div>
      </header>

      <main className="container mx-auto flex-grow px-4 py-8">
        {!calendarGenerated ? (
          <div className="mx-auto max-w-2xl rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-6 text-xl font-semibold">
              Create Your Personal Celebration Calendar
            </h2>
            <p className="mb-6 text-gray-600">
              We'll create a calendar with something special to celebrate about
              YOU every day of the year!
            </p>

            <div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="mb-4">
                  <label className="mb-2 block text-gray-700" htmlFor="name">
                    Your Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={userInfo.name}
                    onChange={handleChange}
                    className="w-full rounded border border-gray-300 p-2"
                  />
                </div>

                <div className="mb-4">
                  <label
                    className="mb-2 block text-gray-700"
                    htmlFor="birthday"
                  >
                    Birthday
                  </label>
                  <input
                    id="birthday"
                    type="date"
                    name="birthday"
                    value={userInfo.birthday}
                    onChange={handleChange}
                    className="w-full rounded border border-gray-300 p-2"
                  />
                </div>

                <div className="mb-4">
                  <label className="mb-2 block text-gray-700" htmlFor="height">
                    Height (cm)
                  </label>
                  <input
                    id="height"
                    type="number"
                    name="height"
                    value={userInfo.height}
                    onChange={handleChange}
                    className="w-full rounded border border-gray-300 p-2"
                  />
                </div>

                <div className="mb-4">
                  <label className="mb-2 block text-gray-700" htmlFor="weight">
                    Weight (kg)
                  </label>
                  <input
                    id="weight"
                    type="number"
                    name="weight"
                    value={userInfo.weight}
                    onChange={handleChange}
                    className="w-full rounded border border-gray-300 p-2"
                  />
                </div>

                <div className="mb-4">
                  <label
                    className="mb-2 block text-gray-700"
                    htmlFor="favoriteColor"
                  >
                    Favorite Color
                  </label>
                  <input
                    id="favoriteColor"
                    type="text"
                    name="favoriteColor"
                    value={userInfo.favoriteColor}
                    onChange={handleChange}
                    className="w-full rounded border border-gray-300 p-2"
                  />
                </div>

                <div className="mb-4">
                  <label
                    className="mb-2 block text-gray-700"
                    htmlFor="favoriteFood"
                  >
                    Favorite Food
                  </label>
                  <input
                    id="favoriteFood"
                    type="text"
                    name="favoriteFood"
                    value={userInfo.favoriteFood}
                    onChange={handleChange}
                    className="w-full rounded border border-gray-300 p-2"
                  />
                </div>

                <div className="mb-4">
                  <label className="mb-2 block text-gray-700" htmlFor="hobbies">
                    Hobbies (comma-separated)
                  </label>
                  <input
                    id="hobbies"
                    type="text"
                    name="hobbies"
                    value={userInfo.hobbies}
                    onChange={handleChange}
                    className="w-full rounded border border-gray-300 p-2"
                    placeholder="Reading, Hiking, Painting"
                  />
                </div>

                <div className="mb-4">
                  <label
                    className="mb-2 block text-gray-700"
                    htmlFor="achievements"
                  >
                    Achievements (comma-separated)
                  </label>
                  <input
                    id="achievements"
                    type="text"
                    name="achievements"
                    value={userInfo.achievements}
                    onChange={handleChange}
                    className="w-full rounded border border-gray-300 p-2"
                    placeholder="Ran a marathon, Learned Spanish"
                  />
                </div>

                <div className="mb-4">
                  <label className="mb-2 block text-gray-700" htmlFor="dreams">
                    Dreams/Aspirations (comma-separated)
                  </label>
                  <input
                    id="dreams"
                    type="text"
                    name="dreams"
                    value={userInfo.dreams}
                    onChange={handleChange}
                    className="w-full rounded border border-gray-300 p-2"
                    placeholder="Visit Japan, Write a book"
                  />
                </div>

                <div className="mb-4">
                  <label
                    className="mb-2 block text-gray-700"
                    htmlFor="personality"
                  >
                    Your Best Traits (comma-separated)
                  </label>
                  <input
                    id="personality"
                    type="text"
                    name="personality"
                    value={userInfo.personality}
                    onChange={handleChange}
                    className="w-full rounded border border-gray-300 p-2"
                    placeholder="Creative, Kind, Determined"
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-center">
                <button
                  onClick={handleSubmit}
                  className="flex items-center rounded-lg bg-purple-600 px-6 py-2 text-white hover:bg-purple-700"
                  disabled={generatingCalendar}
                >
                  {generatingCalendar ? (
                    <>
                      <div className="mr-3 h-5 w-5 animate-spin rounded-full border-t-2 border-r-2 border-white"></div>
                      Creating Your Calendar...
                    </>
                  ) : (
                    "Create My Celebration Calendar"
                  )}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="mx-auto max-w-2xl rounded-lg bg-white p-6 shadow-md">
            <div className="mb-6 text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-purple-100">
                <Star className="h-10 w-10 text-purple-600" />
              </div>
              <h2 className="mt-4 text-2xl font-bold text-gray-800">
                Your Celebration Calendar is Ready!
              </h2>
              <p className="mt-2 text-gray-600">
                We've created a full year of daily celebrations just for{" "}
                {userInfo.name}!
              </p>
            </div>

            <div className="mb-6 rounded-lg bg-gray-50 p-4">
              <h3 className="mb-4 font-semibold text-gray-800">
                Preview of Your Celebrations:
              </h3>

              <div className="space-y-4">
                {previewEvents.map((event, index) => (
                  <div
                    key={index}
                    className="border-l-4 border-purple-400 py-2 pl-4"
                  >
                    <div className="flex items-start">
                      <Gift className="mt-1 mr-2 h-5 w-5 flex-shrink-0 text-purple-500" />
                      <div>
                        <p className="text-sm text-gray-500">
                          {formatDate(event.date.toString())}
                        </p>
                        <p className="font-medium text-gray-800">
                          {event.summary}
                        </p>
                        <p className="mt-1 text-sm text-gray-600">
                          {event.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <p className="mt-4 text-center text-gray-500 italic">
                ...and so much more! Download to see all 365 days.
              </p>
            </div>

            <div className="text-center">
              <button
                onClick={downloadCalendar}
                className="inline-flex items-center rounded-lg bg-purple-600 px-8 py-3 text-white hover:bg-purple-700"
              >
                <Download className="mr-2 h-5 w-5" />
                Download Calendar (.ics)
              </button>

              <p className="mt-4 text-sm text-gray-500">
                Your calendar file can be imported into Google Calendar, Apple
                Calendar, Outlook, and most other calendar applications.
              </p>
            </div>
          </div>
        )}
      </main>

      <footer className="bg-gray-800 p-4 text-center text-white">
        <p>© 2025 Daily Celebration Calendar Generator</p>
      </footer>
    </div>
  );
};

export default PersonalizedCalendarApp;
