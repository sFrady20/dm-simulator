"use client";

import { cn } from "@/lib/utils";
import {
  ComponentProps,
  useId,
  ElementRef,
  forwardRef,
  useMemo,
  ReactNode,
  useRef,
  useState,
  useEffect,
} from "react";
import { useApp } from "@/components/app/provider";
import { cva } from "class-variance-authority";
import { motion } from "motion/react";
import { Message, Message as MessageType } from "@/lib/types";
import { DateTime } from "luxon";

export default function (
  props: {
    name?: string;
    avatar?: string;
  } & ComponentProps<"div">
) {
  const { className, name, avatar, ...rest } = props;

  const id = useId().replace(/[:]/g, "_");

  const textRef = useRef<SVGTextElement>(null);
  const [pathX, setPathX] = useState(0);

  useEffect(() => {
    if (textRef.current) {
      const textWidth = textRef.current.getBBox().width;
      const textX = 225; // The x coordinate of the text
      setPathX(textX + textWidth / 2 + 4); // Center of text + half of text width + 4px
    }
  }, [name]); // Recalculate when name changes

  return (
    <>
      <foreignObject width="450" height="920">
        <div className="grid grid-cols-1 grid-rows-1 w-full h-full bg-[var(--screen-background)] text-[var(--primary-label)]">
          <div
            {...rest}
            className={cn("w-full h-full col-start-1 row-start-1", className)}
          />
          {/* Navigation Bar Blur Effect */}
          <div className="w-full h-[162px] backdrop-blur-[25px] col-start-1 row-start-1" />
        </div>
      </foreignObject>
      {/* Input Bar */}
      <g>
        <rect
          width="402"
          height="100"
          transform="translate(24 815)"
          fill={`var(--screen-background)`}
        />
        {/* Plus Button */}
        <g>
          <rect
            x="38"
            y="820"
            width="34"
            height="34"
            rx="17"
            fill="#787880"
            fill-opacity="0.16"
          />
          <path
            d="M48.0522 837.007C48.0522 836.752 48.1436 836.534 48.3262 836.351C48.5088 836.163 48.7274 836.069 48.9819 836.069H54.0703V830.989C54.0703 830.734 54.1616 830.516 54.3442 830.333C54.5269 830.15 54.7454 830.059 55 830.059C55.2601 830.059 55.4814 830.15 55.6641 830.333C55.8467 830.516 55.938 830.734 55.938 830.989V836.069H61.0181C61.2726 836.069 61.4912 836.163 61.6738 836.351C61.8564 836.534 61.9478 836.752 61.9478 837.007C61.9478 837.267 61.8564 837.488 61.6738 837.671C61.4912 837.848 61.2726 837.937 61.0181 837.937H55.938V843.033C55.938 843.282 55.8467 843.498 55.6641 843.681C55.4814 843.863 55.2601 843.955 55 843.955C54.7454 843.955 54.5269 843.863 54.3442 843.681C54.1616 843.498 54.0703 843.282 54.0703 843.033V837.937H48.9819C48.7274 837.937 48.5088 837.848 48.3262 837.671C48.1436 837.488 48.0522 837.267 48.0522 837.007Z"
            fill="#3C3C43"
            fill-opacity="0.6"
          />
        </g>
        {/* Input */}
        <g>
          <rect
            x="85.5"
            y="819.5"
            width="324"
            height="34"
            rx="16.5"
            stroke="#C6C6C8"
          />
          <path
            d="M98.3779 843V834.052H99.8223V843H98.3779ZM99.1084 832.325C98.8372 832.325 98.6021 832.228 98.4028 832.035C98.2091 831.835 98.1123 831.6 98.1123 831.329C98.1123 831.052 98.2091 830.817 98.4028 830.624C98.6021 830.43 98.8372 830.333 99.1084 830.333C99.3851 830.333 99.6203 830.43 99.814 830.624C100.008 830.817 100.104 831.052 100.104 831.329C100.104 831.6 100.008 831.835 99.814 832.035C99.6203 832.228 99.3851 832.325 99.1084 832.325ZM102.728 843V831.022H104.462L108.563 841.016H108.696L112.796 831.022H114.531V843H113.137V833.853H112.406L114.083 831.354L109.26 843H107.999L103.184 831.354L104.853 833.853H104.122V843H102.728ZM121.056 843.158C120.203 843.158 119.47 842.97 118.856 842.593C118.247 842.217 117.777 841.686 117.445 841C117.118 840.308 116.955 839.494 116.955 838.559V838.551C116.955 837.627 117.118 836.816 117.445 836.119C117.777 835.421 118.244 834.876 118.848 834.483C119.451 834.09 120.156 833.894 120.964 833.894C121.778 833.894 122.475 834.082 123.056 834.458C123.643 834.835 124.091 835.361 124.401 836.036C124.716 836.705 124.874 837.486 124.874 838.376V838.941H117.702V837.787H124.135L123.421 838.841V838.269C123.421 837.566 123.316 836.987 123.106 836.534C122.896 836.08 122.605 835.742 122.234 835.521C121.864 835.294 121.438 835.181 120.956 835.181C120.475 835.181 120.043 835.3 119.661 835.538C119.285 835.77 118.986 836.116 118.765 836.575C118.543 837.035 118.433 837.599 118.433 838.269V838.841C118.433 839.478 118.541 840.023 118.756 840.477C118.972 840.925 119.279 841.271 119.678 841.514C120.076 841.752 120.547 841.871 121.089 841.871C121.493 841.871 121.844 841.816 122.143 841.705C122.442 841.594 122.688 841.453 122.882 841.282C123.076 841.11 123.211 840.936 123.289 840.759L123.322 840.684H124.766L124.75 840.75C124.672 841.055 124.534 841.351 124.334 841.639C124.141 841.921 123.889 842.178 123.579 842.411C123.269 842.638 122.901 842.82 122.475 842.958C122.055 843.091 121.581 843.158 121.056 843.158ZM130.187 843.158C129.522 843.158 128.936 843.058 128.427 842.859C127.918 842.654 127.508 842.369 127.198 842.004C126.894 841.639 126.714 841.21 126.659 840.717H128.136C128.258 841.088 128.496 841.387 128.85 841.614C129.204 841.841 129.666 841.954 130.236 841.954C130.64 841.954 130.994 841.896 131.299 841.78C131.609 841.658 131.852 841.495 132.029 841.29C132.206 841.08 132.295 840.839 132.295 840.568V840.551C132.295 840.247 132.173 839.99 131.93 839.779C131.686 839.563 131.288 839.389 130.734 839.256L129.348 838.924C128.789 838.792 128.33 838.62 127.97 838.41C127.611 838.194 127.345 837.931 127.173 837.621C127.002 837.306 126.916 836.935 126.916 836.509V836.5C126.916 836.002 127.06 835.557 127.348 835.164C127.641 834.771 128.039 834.461 128.543 834.234C129.047 834.007 129.614 833.894 130.245 833.894C130.87 833.894 131.423 833.994 131.905 834.193C132.392 834.387 132.782 834.663 133.075 835.023C133.374 835.383 133.557 835.806 133.623 836.293H132.204C132.11 835.939 131.894 835.651 131.556 835.43C131.219 835.208 130.779 835.098 130.236 835.098C129.882 835.098 129.567 835.156 129.29 835.272C129.013 835.383 128.795 835.538 128.634 835.737C128.474 835.936 128.394 836.168 128.394 836.434V836.451C128.394 836.65 128.446 836.827 128.551 836.982C128.656 837.137 128.82 837.272 129.041 837.389C129.262 837.505 129.547 837.607 129.896 837.696L131.274 838.028C132.115 838.233 132.74 838.526 133.15 838.908C133.565 839.29 133.772 839.801 133.772 840.443V840.46C133.772 840.991 133.615 841.462 133.299 841.871C132.984 842.275 132.555 842.59 132.013 842.817C131.476 843.044 130.867 843.158 130.187 843.158ZM138.919 843.158C138.255 843.158 137.668 843.058 137.159 842.859C136.65 842.654 136.241 842.369 135.931 842.004C135.626 841.639 135.446 841.21 135.391 840.717H136.869C136.99 841.088 137.228 841.387 137.583 841.614C137.937 841.841 138.399 841.954 138.969 841.954C139.373 841.954 139.727 841.896 140.031 841.78C140.341 841.658 140.585 841.495 140.762 841.29C140.939 841.08 141.027 840.839 141.027 840.568V840.551C141.027 840.247 140.906 839.99 140.662 839.779C140.419 839.563 140.02 839.389 139.467 839.256L138.081 838.924C137.522 838.792 137.062 838.62 136.703 838.41C136.343 838.194 136.077 837.931 135.906 837.621C135.734 837.306 135.648 836.935 135.648 836.509V836.5C135.648 836.002 135.792 835.557 136.08 835.164C136.373 834.771 136.772 834.461 137.275 834.234C137.779 834.007 138.346 833.894 138.977 833.894C139.602 833.894 140.156 833.994 140.637 834.193C141.124 834.387 141.514 834.663 141.808 835.023C142.106 835.383 142.289 835.806 142.355 836.293H140.936C140.842 835.939 140.626 835.651 140.289 835.43C139.951 835.208 139.511 835.098 138.969 835.098C138.615 835.098 138.299 835.156 138.022 835.272C137.746 835.383 137.527 835.538 137.367 835.737C137.206 835.936 137.126 836.168 137.126 836.434V836.451C137.126 836.65 137.179 836.827 137.284 836.982C137.389 837.137 137.552 837.272 137.773 837.389C137.995 837.505 138.28 837.607 138.628 837.696L140.006 838.028C140.847 838.233 141.473 838.526 141.882 838.908C142.297 839.29 142.505 839.801 142.505 840.443V840.46C142.505 840.991 142.347 841.462 142.032 841.871C141.716 842.275 141.287 842.59 140.745 842.817C140.208 843.044 139.6 843.158 138.919 843.158ZM147.203 843.158C146.639 843.158 146.13 843.05 145.676 842.834C145.228 842.618 144.871 842.311 144.605 841.913C144.345 841.514 144.215 841.044 144.215 840.501V840.485C144.215 839.954 144.342 839.5 144.597 839.124C144.851 838.742 145.222 838.443 145.709 838.227C146.196 838.011 146.785 837.884 147.477 837.845L150.764 837.646V838.8L147.651 838.999C146.971 839.038 146.473 839.179 146.157 839.422C145.847 839.666 145.692 840.009 145.692 840.452V840.468C145.692 840.922 145.864 841.276 146.207 841.531C146.55 841.78 146.982 841.904 147.502 841.904C147.994 841.904 148.432 841.807 148.813 841.614C149.195 841.415 149.494 841.146 149.71 840.809C149.931 840.471 150.042 840.089 150.042 839.663V836.874C150.042 836.321 149.873 835.9 149.536 835.612C149.204 835.319 148.703 835.172 148.033 835.172C147.496 835.172 147.056 835.269 146.713 835.463C146.37 835.651 146.141 835.919 146.024 836.268L146.016 836.293H144.572L144.58 836.243C144.658 835.773 144.851 835.363 145.161 835.015C145.477 834.66 145.883 834.387 146.381 834.193C146.879 833.994 147.447 833.894 148.083 833.894C148.813 833.894 149.431 834.013 149.934 834.251C150.443 834.489 150.828 834.832 151.088 835.28C151.354 835.723 151.486 836.254 151.486 836.874V843H150.042V841.68H149.909C149.721 841.996 149.491 842.264 149.22 842.485C148.955 842.707 148.653 842.875 148.315 842.992C147.978 843.102 147.607 843.158 147.203 843.158ZM157.812 846.154C157.092 846.154 156.464 846.052 155.927 845.847C155.39 845.648 154.962 845.363 154.641 844.992C154.325 844.627 154.129 844.201 154.051 843.714L154.068 843.706H155.562L155.57 843.714C155.648 844.051 155.88 844.328 156.268 844.544C156.655 844.765 157.17 844.876 157.812 844.876C158.614 844.876 159.239 844.693 159.688 844.328C160.141 843.968 160.368 843.459 160.368 842.801V840.991H160.235C160.047 841.318 159.812 841.597 159.53 841.83C159.248 842.062 158.929 842.239 158.575 842.361C158.221 842.477 157.839 842.535 157.43 842.535C156.66 842.535 155.994 842.353 155.429 841.987C154.87 841.617 154.439 841.107 154.134 840.46C153.83 839.812 153.678 839.071 153.678 838.235V838.219C153.678 837.383 153.83 836.642 154.134 835.994C154.444 835.341 154.881 834.829 155.446 834.458C156.01 834.082 156.683 833.894 157.463 833.894C157.883 833.894 158.271 833.96 158.625 834.093C158.979 834.226 159.292 834.414 159.563 834.658C159.84 834.901 160.069 835.192 160.252 835.529H160.352V834.052H161.796V842.875C161.796 843.54 161.633 844.118 161.306 844.61C160.985 845.103 160.526 845.482 159.928 845.748C159.331 846.019 158.625 846.154 157.812 846.154ZM157.745 841.257C158.299 841.257 158.772 841.13 159.165 840.875C159.563 840.615 159.867 840.258 160.078 839.804C160.293 839.35 160.401 838.827 160.401 838.235V838.219C160.401 837.627 160.293 837.101 160.078 836.642C159.867 836.182 159.563 835.823 159.165 835.562C158.772 835.302 158.299 835.172 157.745 835.172C157.192 835.172 156.721 835.302 156.334 835.562C155.952 835.823 155.659 836.182 155.454 836.642C155.255 837.101 155.155 837.627 155.155 838.219V838.235C155.155 838.827 155.255 839.35 155.454 839.804C155.659 840.258 155.952 840.615 156.334 840.875C156.721 841.13 157.192 841.257 157.745 841.257ZM168.138 843.158C167.285 843.158 166.552 842.97 165.938 842.593C165.329 842.217 164.859 841.686 164.527 841C164.2 840.308 164.037 839.494 164.037 838.559V838.551C164.037 837.627 164.2 836.816 164.527 836.119C164.859 835.421 165.326 834.876 165.93 834.483C166.533 834.09 167.238 833.894 168.046 833.894C168.86 833.894 169.557 834.082 170.138 834.458C170.725 834.835 171.173 835.361 171.483 836.036C171.798 836.705 171.956 837.486 171.956 838.376V838.941H164.784V837.787H171.217L170.503 838.841V838.269C170.503 837.566 170.398 836.987 170.188 836.534C169.978 836.08 169.687 835.742 169.316 835.521C168.946 835.294 168.52 835.181 168.038 835.181C167.557 835.181 167.125 835.3 166.743 835.538C166.367 835.77 166.068 836.116 165.847 836.575C165.625 837.035 165.515 837.599 165.515 838.269V838.841C165.515 839.478 165.623 840.023 165.838 840.477C166.054 840.925 166.361 841.271 166.76 841.514C167.158 841.752 167.629 841.871 168.171 841.871C168.575 841.871 168.926 841.816 169.225 841.705C169.524 841.594 169.77 841.453 169.964 841.282C170.158 841.11 170.293 840.936 170.371 840.759L170.404 840.684H171.848L171.832 840.75C171.754 841.055 171.616 841.351 171.417 841.639C171.223 841.921 170.971 842.178 170.661 842.411C170.351 842.638 169.983 842.82 169.557 842.958C169.137 843.091 168.663 843.158 168.138 843.158Z"
            fill={`var(--primary-label)`}
            fill-opacity="0.3"
          />
          <path
            d="M384.406 835.703V834.117C384.406 833.956 384.464 833.818 384.578 833.703C384.693 833.589 384.831 833.531 384.992 833.531C385.159 833.531 385.299 833.589 385.414 833.703C385.529 833.818 385.586 833.956 385.586 834.117V835.656C385.586 836.542 385.768 837.318 386.133 837.984C386.497 838.651 387.01 839.169 387.672 839.539C388.333 839.904 389.109 840.086 390 840.086C390.891 840.086 391.664 839.904 392.32 839.539C392.982 839.169 393.495 838.651 393.859 837.984C394.224 837.318 394.406 836.542 394.406 835.656V834.117C394.406 833.956 394.464 833.818 394.578 833.703C394.693 833.589 394.833 833.531 395 833.531C395.161 833.531 395.299 833.589 395.414 833.703C395.529 833.818 395.586 833.956 395.586 834.117V835.703C395.586 836.724 395.375 837.63 394.953 838.422C394.536 839.214 393.953 839.849 393.203 840.328C392.453 840.802 391.581 841.081 390.586 841.164V842.984H393.484C393.651 842.984 393.792 843.042 393.906 843.156C394.021 843.271 394.078 843.411 394.078 843.578C394.078 843.74 394.021 843.878 393.906 843.992C393.792 844.107 393.651 844.164 393.484 844.164H386.508C386.341 844.164 386.201 844.107 386.086 843.992C385.971 843.878 385.914 843.74 385.914 843.578C385.914 843.411 385.971 843.271 386.086 843.156C386.201 843.042 386.341 842.984 386.508 842.984H389.406V841.164C388.411 841.081 387.539 840.802 386.789 840.328C386.039 839.849 385.453 839.214 385.031 838.422C384.615 837.63 384.406 836.724 384.406 835.703ZM390 838.406C389.479 838.406 389.023 838.286 388.633 838.047C388.242 837.807 387.938 837.477 387.719 837.055C387.5 836.628 387.391 836.135 387.391 835.578V830.352C387.391 829.794 387.5 829.305 387.719 828.883C387.938 828.456 388.242 828.122 388.633 827.883C389.023 827.643 389.479 827.523 390 827.523C390.516 827.523 390.969 827.643 391.359 827.883C391.755 828.122 392.06 828.456 392.273 828.883C392.492 829.305 392.602 829.794 392.602 830.352V835.578C392.602 836.135 392.492 836.628 392.273 837.055C392.06 837.477 391.755 837.807 391.359 838.047C390.969 838.286 390.516 838.406 390 838.406Z"
            fill={`var(--primary-label)`}
            fill-opacity="0.3"
          />
        </g>
      </g>
      {/* Navigation Bar  */}
      <g>
        {/* Background */}
        <mask fill="white">
          <path d="M24 23H426V162H24V23Z" />
        </mask>
        <path
          d="M24 23H426V162H24V23Z"
          fill={"var(--chrome)"}
          fill-opacity="0.75"
          style={{ mixBlendMode: "hard-light" }}
        />
        {/* Border */}
        <mask id={`border-${id}`} fill="white">
          <path d="M24 23H426V162H24V23Z" />
        </mask>
        <path
          d="M426 161.67H24V162.33H426V161.67Z"
          fill={`var(--primary-label)`}
          fill-opacity="0.3"
          mask={`url(#border-${id})`}
        />
        <g>
          {/* Avatar */}
          <rect
            id="Avatar"
            x="199.5"
            y="86"
            width="50"
            height="50"
            rx="25"
            fill={`url(#pattern-${id})`}
          />
          <g>
            {/* Name and Chevron */}
            <text
              ref={textRef}
              fill="var(--primary-label)"
              xmlSpace="preserve"
              style={{ whiteSpace: "pre" }}
              fontSize="11"
              letterSpacing="0px"
              textAnchor="middle"
              x="225"
              y="151.41"
            >
              {name}
            </text>
            <path
              d="M4.737 0.498C4.737 0.574 4.723 0.644 4.693 0.709C4.664 0.773 4.62 0.835 4.562 0.893L1.138 4.242C1.042 4.342 0.921 4.391 0.778 4.391C0.684 4.391 0.598 4.368 0.519 4.321C0.439 4.277 0.376 4.216 0.33 4.136C0.286 4.06 0.264 3.975 0.264 3.882C0.264 3.741 0.316 3.616 0.422 3.508L3.507 0.498L0.422 -2.512C0.316 -2.621 0.264 -2.744 0.264 -2.882C0.264 -2.978 0.286 -3.065 0.33 -3.141C0.376 -3.217 0.439 -3.277 0.519 -3.321C0.598 -3.368 0.684 -3.391 0.778 -3.391C0.921 -3.391 1.042 -3.343 1.138 -3.246L4.562 0.102C4.62 0.161 4.664 0.222 4.693 0.287C4.723 0.351 4.737 0.422 4.737 0.498Z"
              fill="#3C3C43"
              fill-opacity="0.6"
              transform={`translate(${pathX}, 147.5)`}
            />
          </g>
        </g>
        <g>
          {/* Back */}
          <path
            d="M41.332 108.244C41.332 108.058 41.3643 107.886 41.4287 107.729C41.5003 107.571 41.6077 107.421 41.751 107.277L50.1191 99.0918C50.3626 98.8555 50.6562 98.7373 51 98.7373C51.2363 98.7373 51.4476 98.7946 51.6338 98.9092C51.8271 99.0166 51.9811 99.1634 52.0957 99.3496C52.2103 99.5358 52.2676 99.7471 52.2676 99.9834C52.2676 100.32 52.1351 100.621 51.8701 100.886L44.3291 108.244L51.8701 115.603C52.1351 115.868 52.2676 116.172 52.2676 116.516C52.2676 116.745 52.2103 116.952 52.0957 117.139C51.9811 117.332 51.8271 117.482 51.6338 117.59C51.4476 117.704 51.2363 117.762 51 117.762C50.6562 117.762 50.3626 117.64 50.1191 117.396L41.751 109.211C41.6077 109.068 41.5003 108.917 41.4287 108.76C41.3643 108.602 41.332 108.43 41.332 108.244Z"
            fill="var(--system-blue)"
          />
          {/* FaceTime */}
          <path
            d="M379.782 117.074C378.472 117.074 377.444 116.713 376.699 115.989C375.962 115.259 375.593 114.238 375.593 112.928V103.55C375.593 102.246 375.976 101.233 376.742 100.51C377.516 99.7793 378.529 99.4141 379.782 99.4141H391.008C392.318 99.4141 393.342 99.7793 394.08 100.51C394.825 101.233 395.197 102.246 395.197 103.55V112.928C395.197 114.238 394.825 115.259 394.08 115.989C393.342 116.713 392.318 117.074 391.008 117.074H379.782ZM380.083 115.452H390.707C391.588 115.452 392.268 115.223 392.748 114.765C393.228 114.306 393.468 113.612 393.468 112.681V103.808C393.468 102.877 393.228 102.182 392.748 101.724C392.268 101.258 391.588 101.025 390.707 101.025H380.083C379.202 101.025 378.522 101.258 378.042 101.724C377.562 102.182 377.322 102.877 377.322 103.808V112.681C377.322 113.612 377.562 114.306 378.042 114.765C378.522 115.223 379.202 115.452 380.083 115.452ZM394.95 105.236L399.258 101.595C399.473 101.416 399.695 101.272 399.924 101.165C400.153 101.05 400.379 100.993 400.601 100.993C401.073 100.993 401.453 101.151 401.739 101.466C402.026 101.781 402.169 102.189 402.169 102.69V113.798C402.169 114.299 402.026 114.707 401.739 115.022C401.453 115.338 401.073 115.495 400.601 115.495C400.379 115.495 400.153 115.441 399.924 115.334C399.695 115.219 399.473 115.073 399.258 114.894L394.95 111.241V109.211L400.063 113.433C400.114 113.461 400.157 113.49 400.192 113.519C400.235 113.54 400.278 113.551 400.321 113.551C400.443 113.551 400.504 113.468 400.504 113.304V103.185C400.504 103.013 400.443 102.927 400.321 102.927C400.278 102.927 400.235 102.941 400.192 102.97C400.157 102.991 400.114 103.02 400.063 103.056L394.95 107.277V105.236Z"
            fill="var(--system-blue)"
          />
        </g>
      </g>
      <defs>
        <filter
          id={`filter-${id}`}
          x="-26"
          y="-27"
          width="502"
          height="239"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feGaussianBlur in="BackgroundImageFix" stdDeviation="25" />
          <feComposite
            in2="SourceAlpha"
            operator="in"
            result="effect1_backgroundBlur_2003_5450"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_backgroundBlur_2003_5450"
            result="shape"
          />
        </filter>
        <pattern
          id={`pattern-${id}`}
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use xlinkHref={`#image-${id}`} transform="scale(0.00740741)" />
        </pattern>
        <image
          id={`image-${id}`}
          width="135"
          height="135"
          xlinkHref={avatar || defaultContactImage}
          preserveAspectRatio="xMidYMid slice"
        />
      </defs>
    </>
  );
}

const messageRowVariants = cva(
  "flex gap-[10px] items-center group justify-start",
  {
    variants: {
      type: {
        received: "flex-row",
        sent: "flex-row-reverse",
      },
      isOver: {
        true: "",
        false: "",
      },
    },
  }
);

const messageBubbleVariants = cva(
  "max-w-[295px] px-[14px] py-[7px] rounded-[16px] text-[17px] text-left relative group cursor-default whitespace-pre-wrap",
  {
    variants: {
      type: {
        received: "bg-[var(--messaging-bubble)] text-[var(--primary-label)]",
        sent: "bg-[var(--system-blue)] text-[#ffffff]",
      },
      os: {
        iphone: "",
        android: "",
      },
      isOver: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      {
        os: "iphone",
        type: "sent",
        className: "bg-[var(--system-blue)] text-[#ffffff]",
      },
      {
        os: "android",
        type: "sent",
        className: "bg-[var(--system-green)] text-[#ffffff]",
      },
    ],
  }
);

const messageActionsVariants = cva(
  "w-6 h-6 rounded-full bg-[var(--messaging-bubble)] flex-row items-center justify-center cursor-pointer opacity-60 hover:opacity-100 hidden group-hover:flex",
  {
    variants: {
      destructive: {
        true: "text-[var(--system-red)]",
        false: "text-[var(--primary-label)]",
      },
    },
    defaultVariants: { destructive: false },
  }
);

function getSeparator(
  message: Message,
  previousMessage: Message | null,
  systemTime: DateTime,
  systemOS: "iphone" | "android"
): ReactNode | null {
  const messageTime = DateTime.fromISO(message.time.toString());

  if (!previousMessage) {
    return (
      <div className="pb-4">
        <div className="text-xs text-[var(--secondary-label)]">
          {systemOS === "iphone" ? `iMessage` : `Text Message`}
        </div>
        <div className="text-xs text-[var(--secondary-label)]">
          {!messageTime.hasSame(systemTime, "day") ? (
            messageTime > systemTime.minus({ days: 7 }) ? (
              <>
                <span className="font-bold">
                  {messageTime.toFormat("cccc")}
                </span>
                <span className="ml-1">
                  {messageTime.toLocaleString(DateTime.TIME_SIMPLE)}
                </span>
              </>
            ) : (
              messageTime.toFormat("ccc, LLL d 'at' h:mm a")
            )
          ) : null}
        </div>
      </div>
    );
  }

  const previousMessageTime = DateTime.fromISO(previousMessage.time.toString());

  // Date change
  if (!previousMessageTime?.hasSame(messageTime, "day")) {
    return (
      <div className="py-4 text-xs text-[var(--secondary-label)]">
        {messageTime.hasSame(systemTime, "day") ? (
          <>
            <span className="font-bold">Today</span>
            <span className="ml-1">
              {messageTime.toLocaleString(DateTime.TIME_SIMPLE)}
            </span>
          </>
        ) : messageTime < systemTime.plus({ days: 7 }) ? (
          <>
            <span className="font-bold">{messageTime.toFormat("cccc")}</span>
            <span className="ml-1">
              {messageTime.toLocaleString(DateTime.TIME_SIMPLE)}
            </span>
          </>
        ) : (
          messageTime.toFormat("ccc, LLL d 'at' h:mm a")
        )}
      </div>
    );
  }

  // Blank space
  if (
    previousMessage?.type !== message.type ||
    (previousMessageTime &&
      messageTime > previousMessageTime.plus({ minutes: 5 }))
  ) {
    return <div className="h-[20px]" />;
  }

  return <div className="h-[4px]" />;
}

export const IMessageScreenMessageList = function (props: {
  messages: Message[];
}) {
  const { messages } = props;

  const app = useApp();
  const systemOS = app((x) => x.contactOS);
  const systemTime = app((x) => x.systemTime);

  const sortedMessagesWithTails = useMemo(
    () =>
      messages
        .toSorted((a, b) =>
          DateTime.fromISO(a.time.toString()) >=
          DateTime.fromISO(b.time.toString())
            ? 1
            : -1
        )
        .reduce((acc, message, i) => {
          const previousMessage = acc[i - 1];

          if (previousMessage) {
            previousMessage.hasTail = (() => {
              //not same type (sent vs received)
              if (previousMessage.type !== message.type) return true;

              const previousMessageTime = DateTime.fromISO(
                previousMessage.time.toString()
              );
              const messageTime = DateTime.fromISO(message.time.toString());

              //not same day
              if (!previousMessageTime.hasSame(messageTime, "day")) return true;

              //not 5 minutes apart
              if (messageTime > previousMessageTime.plus({ minutes: 5 }))
                return true;

              return false;
            })();
          }

          acc.push({ ...message, hasTail: true });
          return acc;
        }, [] as (Message & { hasTail?: boolean })[]),
    [messages]
  );

  const messagesWithSeparators = useMemo(
    () =>
      sortedMessagesWithTails.flatMap((message, i) => {
        const previousMessage = sortedMessagesWithTails[i - 1];
        const separator = getSeparator(
          message,
          previousMessage,
          DateTime.fromISO(systemTime.toString()),
          systemOS
        );
        return [
          ...(separator ? [separator] : []),
          <IMessageScreenMessage
            key={message.id}
            {...message}
            variants={{
              initial: {},
              animate: {},
              exit: {},
            }}
            initial={"initial"}
            animate={"animate"}
            exit={"exit"}
          >
            {message.text}
          </IMessageScreenMessage>,
        ];
      }),
    [sortedMessagesWithTails, systemTime, systemOS]
  );

  return <div className="flex flex-col w-full">{messagesWithSeparators}</div>;
};

export const IMessageScreenMessage = motion(
  forwardRef<
    ElementRef<"div">,
    Omit<ComponentProps<"div">, "id"> & MessageType & { hasTail?: boolean }
  >(function (props, ref) {
    const { className, type, children, id, hasTail, ...rest } = props;

    const app = useApp();
    const systemOS = app((x) => x.contactOS);

    return (
      <div
        ref={ref}
        {...rest}
        className={cn(messageRowVariants({ type }), className)}
      >
        <motion.div
          className={cn(
            messageBubbleVariants({ type, os: systemOS }),
            className
          )}
          variants={{
            initial: { opacity: 0, scale: 0.8 },
            animate: { opacity: 1, scale: 1 },
            exit: { opacity: 0, scale: 0.8 },
          }}
        >
          {children}
          {/* Tail */}
          {hasTail && (
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={cn(
                "absolute",
                type === "sent"
                  ? "-right-[5px] -bottom-[5px] scale-x-[-1]"
                  : "-left-[5px] -bottom-[5px]"
              )}
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M0.797852 19.5H0.999564C11.493 19.5 19.9996 10.9934 19.9996 0.5H4.99989V3.5C4.99989 9.0858 4.99989 11.8787 4.21426 14.1239C3.49455 16.1807 2.31583 18.0127 0.797852 19.5Z"
                fill={
                  type === "sent"
                    ? systemOS === "iphone"
                      ? "var(--system-blue)"
                      : "var(--system-green)"
                    : "var(--messaging-bubble)"
                }
              />
            </svg>
          )}
        </motion.div>
        <>
          <div
            className={messageActionsVariants({ destructive: true })}
            onClick={() => {
              app.setState((x) => {
                const found = x.messages.findIndex((x) => x.id === id);
                x.messages.splice(found, 1);
              });
            }}
          >
            <i className="icon-[heroicons--trash] text-xs" />
          </div>
        </>
      </div>
    );
  })
);

const defaultContactImage =
  "data:image/png;base64,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";
