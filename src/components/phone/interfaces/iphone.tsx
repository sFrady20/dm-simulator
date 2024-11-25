import { useApp } from "@/components/app/provider";
import { DateTime } from "luxon";
import { ReactNode } from "react";

export default function () {
  const app = useApp();
  const systemTime = app((x) => x.systemTime.toString());
  const systemSignalStrength = app((x) => x.systemSignalStrength);
  const systemWifiStrength = app((x) => x.systemWifiStrength);
  const systemBatteryLevel = app((x) => x.systemBatteryLevel);
  const systemBatteryCharging = app((x) => x.systemBatteryCharging);

  return (
    <>
      {/* Status Bar */}
      <g>
        {/* Time */}
        <g>
          <text
            fill={`var(--primary-label)`}
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            font-size="17"
            letter-spacing="0px"
            fontWeight={"bold"}
          >
            <tspan x="80.2715" y="61.043">
              {DateTime.fromISO(systemTime.toString()).toFormat("h:mm")}
            </tspan>
          </text>
        </g>

        {/* Cell */}
        <g>
          <path
            opacity={systemSignalStrength >= 0.8 ? "1" : "0.3"}
            d="M330.798 48.887C331.387 48.887 331.865 49.4001 331.865 50.0332V59.9672C331.865 60.6002 331.387 61.1134 330.798 61.1134H329.732C329.143 61.1134 328.665 60.6002 328.665 59.9672V50.0332C328.665 49.4001 329.143 48.887 329.732 48.887H330.798Z"
            fill={`var(--primary-label)`}
          />
          <path
            opacity={systemSignalStrength >= 0.6 ? "1" : "0.3"}
            d="M325.534 51.332H324.467C323.878 51.332 323.4 51.8575 323.4 52.5058V59.9394C323.4 60.5877 323.878 61.1132 324.467 61.1132H325.534C326.123 61.1132 326.6 60.5877 326.6 59.9394V52.5058C326.6 51.8575 326.123 51.332 325.534 51.332Z"
            fill={`var(--primary-label)`}
          />
          <path
            opacity={systemSignalStrength >= 0.4 ? "1" : "0.3"}
            d="M319.061 53.981H320.127C320.717 53.981 321.194 54.5131 321.194 55.1696V59.9244C321.194 60.5808 320.717 61.113 320.127 61.113H319.061C318.472 61.113 317.994 60.5808 317.994 59.9244V55.1696C317.994 54.5131 318.472 53.981 319.061 53.981Z"
            fill={`var(--primary-label)`}
          />
          <path
            opacity={systemSignalStrength >= 0.2 ? "1" : "0.3"}
            d="M313.732 56.4263H314.798C315.387 56.4263 315.865 56.9509 315.865 57.598V59.9414C315.865 60.5885 315.387 61.1131 314.798 61.1131H313.732C313.143 61.1131 312.665 60.5885 312.665 59.9414V57.598C312.665 56.9509 313.143 56.4263 313.732 56.4263Z"
            fill={`var(--primary-label)`}
          />
        </g>

        {/* Wifi */}
        <g>
          <path
            opacity={systemWifiStrength >= 0.25 ? "1" : "0.3"}
            d="M349.854 58.5967C349.921 58.5228 349.959 58.4213 349.957 58.3159C349.955 58.2106 349.914 58.1108 349.844 58.0401C348.454 56.7262 346.418 56.7262 345.028 58.0401C344.958 58.1107 344.917 58.2105 344.915 58.3158C344.913 58.4212 344.95 58.5228 345.017 58.5967L347.194 61.0514C347.258 61.1235 347.345 61.1641 347.436 61.1641C347.527 61.1641 347.614 61.1235 347.678 61.0514L349.854 58.5967Z"
            fill={`var(--primary-label)`}
          />
          <path
            opacity={systemWifiStrength >= 0.5 ? "1" : "0.3"}
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M347.435 55.5227C348.792 55.5226 350.101 56.0343 351.107 56.9585C351.244 57.0896 351.458 57.0868 351.591 56.9521L352.878 55.6327C352.946 55.5635 352.983 55.4697 352.982 55.3721C352.981 55.2746 352.942 55.1815 352.873 55.1137C349.809 52.2228 345.064 52.2228 342 55.1137C341.931 55.1815 341.892 55.2746 341.891 55.3722C341.89 55.4698 341.927 55.5636 341.995 55.6327L343.282 56.9521C343.415 57.0868 343.629 57.0896 343.765 56.9585C344.771 56.0349 346.079 55.5232 347.435 55.5227Z"
            fill={`var(--primary-label)`}
          />
          <path
            opacity={systemWifiStrength >= 0.75 ? "1" : "0.3"}
            d="M354.118 53.8056C352.316 52.1521 349.924 51.2301 347.437 51.23C344.949 51.2299 342.557 52.152 340.754 53.8056C340.619 53.9335 340.401 53.9319 340.268 53.802L338.97 52.5385C338.902 52.4727 338.865 52.3836 338.865 52.291C338.866 52.1983 338.905 52.1097 338.973 52.0447C343.704 47.67 351.168 47.67 355.899 52.0447C355.968 52.1097 356.006 52.1983 356.007 52.291C356.007 52.3837 355.97 52.4728 355.902 52.5385L354.605 53.802C354.471 53.9317 354.254 53.9333 354.118 53.8056Z"
            fill={`var(--primary-label)`}
          />
        </g>

        {/* Battery */}
        <g>
          <rect
            opacity="0.35"
            x="363.507"
            y="49"
            width="24"
            height="12"
            rx="3.8"
            stroke={`var(--primary-label)`}
          />
          <path
            opacity="0.4"
            d="M389.007 53.2812V57.3567C389.812 57.0116 390.335 56.2086 390.335 55.319C390.335 54.4294 389.812 53.6264 389.007 53.2812"
            fill={`var(--primary-label)`}
          />
          <rect
            x="365.007"
            y="50.5"
            width="21"
            height="9"
            rx="2.5"
            fill={`var(--primary-label)`}
          />
        </g>
      </g>

      {/* Home Indicator */}
      <rect
        width="144"
        height="5"
        rx="2.5"
        transform="matrix(-1 0 0 1 297 884)"
        fill="black"
      />
    </>
  );
}
