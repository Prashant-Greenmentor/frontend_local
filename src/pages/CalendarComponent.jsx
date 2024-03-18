import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

export default function CalendarComponent() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi();
      cal("ui", {
        "theme": "light",
        "styles": {
          "branding": {
            "brandColor": "#000000"
          }
        },
        "hideEventTypeDetails": false,
        "layout": "month_view"
      });
    })();
  }, []);

  return (
    <div className="p-5 mt-10">
      <Cal
        calLink="greenmentor/carbon-offset"
        style={{ width: "100%", height: "100%", overflow: "scroll" }}
        config={{ layout: 'month_view' }}
      />
    </div>
  );
};
