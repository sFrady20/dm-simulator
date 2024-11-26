"use client";

import { useApp } from "@/components/app/provider";
import TimeInput from "@/components/ui/time-input";
import { Slider } from "@/components/ui/slider";
import { DateAndTimeInput } from "../ui/date-and-time-input";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";

export const EditorSystemFields = () => {
  const app = useApp();

  const systemTime = app((x) => x.systemTime);
  const systemSignalStrength = app((x) => x.systemSignalStrength);
  const systemWifiStrength = app((x) => x.systemWifiStrength);
  const systemBatteryLevel = app((x) => x.systemBatteryLevel);
  const systemBatteryCharging = app((x) => x.systemBatteryCharging);
  const systemMode = app((x) => x.systemMode);

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="grid grid-cols-subgrid col-span-2 gap-4 items-center">
        <div>System Time</div>
        <DateAndTimeInput
          hideTimeZone
          value={systemTime}
          onValueChange={(x) => app.setState({ systemTime: x ?? undefined })}
        />
      </div>

      <div className="grid grid-cols-subgrid col-span-2 gap-4 items-center">
        <div>Signal strength</div>
        <Slider
          min={0}
          max={1}
          step={1 / 4}
          value={[systemSignalStrength]}
          onValueChange={([x]) => app.setState({ systemSignalStrength: x })}
        />
      </div>

      <div className="grid grid-cols-subgrid col-span-2 gap-4 items-center">
        <div>Wifi strength</div>
        <Slider
          min={0}
          max={1}
          step={1 / 3}
          value={[systemWifiStrength]}
          onValueChange={([x]) => app.setState({ systemWifiStrength: x })}
        />
      </div>

      <div className="grid grid-cols-subgrid col-span-2 gap-4 items-center">
        <div>Battery Level</div>
        <Slider
          min={0}
          max={1}
          step={1 / 9}
          value={[systemBatteryLevel]}
          onValueChange={([x]) => app.setState({ systemBatteryLevel: x })}
        />
      </div>

      <div className="grid grid-cols-subgrid col-span-2 gap-4 items-center">
        <div>Mode</div>
        <Tabs
          value={systemMode}
          onValueChange={(x) => app.setState({ systemMode: x as any })}
        >
          <TabsList className="w-full">
            <TabsTrigger value="light" className="flex-1">
              Light
            </TabsTrigger>
            <TabsTrigger value="dark" className="flex-1">
              Dark
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
};
