"use client";

import { useApp } from "@/components/app/provider";
import TimeInput from "@/components/ui/time-input";
import { Slider } from "@/components/ui/slider";

export const EditorSystemFields = () => {
  const app = useApp();

  const systemTime = app((x) => x.systemTime);
  const systemSignalStrength = app((x) => x.systemSignalStrength);
  const systemWifiStrength = app((x) => x.systemWifiStrength);
  const systemBatteryLevel = app((x) => x.systemBatteryLevel);
  const systemBatteryCharging = app((x) => x.systemBatteryCharging);

  return (
    <div>
      <TimeInput
        hideTimeZone
        value={systemTime}
        onValueChange={(x) => app.setState({ systemTime: x ?? undefined })}
      />

      <div>Signal strength</div>
      <Slider
        min={0}
        max={1}
        step={1 / 4}
        value={[systemSignalStrength]}
        onValueChange={([x]) => app.setState({ systemSignalStrength: x })}
      />

      <div>Wifi strength</div>
      <Slider
        min={0}
        max={1}
        step={1 / 3}
        value={[systemWifiStrength]}
        onValueChange={([x]) => app.setState({ systemWifiStrength: x })}
      />

      <div>Battery Level</div>
      <Slider
        min={0}
        max={1}
        step={1 / 9}
        value={[systemBatteryLevel]}
        onValueChange={([x]) => app.setState({ systemBatteryLevel: x })}
      />
    </div>
  );
};
