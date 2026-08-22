
export const DemoPNgDiffTheme = {
  components: {
    inputtext: {
      extend: {
        invalid: {
          text: {
            color: "{form.field.invalid.placeholder.color}"
          }
        }
      }
    },
    password: {
      extend: {
        invalid: {
          text: {
            color: "{form.field.invalid.placeholder.color}"
          }
        }
      }
    },
    button: {
      root: {
        paddingX: "10px",
        paddingY: "7px",
        sm: {
          fontSize: "14px"
        },
        label: {
          fontWeight: "400"
        }
      }
    },
    card: {
      body: {
        padding: "32px 64px 64px",
        gap: "32px"
      }
    },
    panelmenu: {
      submenu: {
        indent: "2rem"
      }
    }
  },
  extend: {
    test: {
      color: "{emerald.400}"
    }
  },
  primitive: {
    emerald: {
      50: "#ecfdf5",
      100: "#d1fae5",
      200: "#a7f3d0",
      300: "#6ee7b7",
      400: "#34d399",
      500: "#10b981",
      600: "#059669",
      700: "#047857",
      800: "#065f46",
      900: "#064e3b",
      950: "#022c22"
    },
    green: {
      50: "#f0fdf4",
      100: "#dcfce7",
      200: "#bbf7d0",
      300: "#86efac",
      400: "#4ade80",
      500: "#22c55e",
      600: "#16a34a",
      700: "#15803d",
      800: "#166534",
      900: "#14532d",
      950: "#052e16"
    },
    lime: {
      50: "#f7fee7",
      100: "#ecfccb",
      200: "#d9f99d",
      300: "#bef264",
      400: "#a3e635",
      500: "#84cc16",
      600: "#65a30d",
      700: "#4d7c0f",
      800: "#3f6212",
      900: "#365314",
      950: "#1a2e05"
    },
    red: {
      50: "#fef2f2",
      100: "#fee2e2",
      200: "#fecaca",
      300: "#fca5a5",
      400: "#f87171",
      500: "#ef4444",
      600: "#dc2626",
      700: "#b91c1c",
      800: "#991b1b",
      900: "#7f1d1d",
      950: "#450a0a"
    },
    orange: {
      50: "#fff7ed",
      100: "#ffedd5",
      200: "#fed7aa",
      300: "#fdba74",
      400: "#fb923c",
      500: "#f97316",
      600: "#ea580c",
      700: "#c2410c",
      800: "#9a3412",
      900: "#7c2d12",
      950: "#431407"
    },
    amber: {
      50: "#fffbeb",
      100: "#fef3c7",
      200: "#fde68a",
      300: "#fcd34d",
      400: "#fbbf24",
      500: "#f59e0b",
      600: "#d97706",
      700: "#b45309",
      800: "#92400e",
      900: "#78350f",
      950: "#451a03"
    },
    yellow: {
      50: "#fefce8",
      100: "#fef9c3",
      200: "#fef08a",
      300: "#fde047",
      400: "#facc15",
      500: "#eab308",
      600: "#ca8a04",
      700: "#a16207",
      800: "#854d0e",
      900: "#713f12",
      950: "#422006"
    },
    teal: {
      50: "#f0fdfa",
      100: "#ccfbf1",
      200: "#99f6e4",
      300: "#5eead4",
      400: "#2dd4bf",
      500: "#14b8a6",
      600: "#0d9488",
      700: "#0f766e",
      800: "#115e59",
      900: "#134e4a",
      950: "#042f2e"
    },
    cyan: {
      50: "#ecfeff",
      100: "#cffafe",
      200: "#a5f3fc",
      300: "#67e8f9",
      400: "#22d3ee",
      500: "#06b6d4",
      600: "#0891b2",
      700: "#0e7490",
      800: "#155e75",
      900: "#164e63",
      950: "#083344"
    },
    sky: {
      50: "#f0f9ff",
      100: "#e0f2fe",
      200: "#bae6fd",
      300: "#7dd3fc",
      400: "#38bdf8",
      500: "#0ea5e9",
      600: "#0284c7",
      700: "#0369a1",
      800: "#075985",
      900: "#0c4a6e",
      950: "#082f49"
    },
    blue: {
      50: "#eff6ff",
      100: "#dbeafe",
      200: "#bfdbfe",
      300: "#93c5fd",
      400: "#60a5fa",
      500: "#3b82f6",
      600: "#2563eb",
      700: "#1d4ed8",
      800: "#1e40af",
      900: "#1e3a8a",
      950: "#172554"
    },
    indigo: {
      50: "#eef2ff",
      100: "#e0e7ff",
      200: "#c7d2fe",
      300: "#a5b4fc",
      400: "#818cf8",
      500: "#6366f1",
      600: "#4f46e5",
      700: "#4338ca",
      800: "#3730a3",
      900: "#312e81",
      950: "#1e1b4b"
    },
    violet: {
      50: "#f5f3ff",
      100: "#ede9fe",
      200: "#ddd6fe",
      300: "#c4b5fd",
      400: "#a78bfa",
      500: "#8b5cf6",
      600: "#7c3aed",
      700: "#6d28d9",
      800: "#5b21b6",
      900: "#4c1d95",
      950: "#2e1065"
    },
    purple: {
      50: "#faf5ff",
      100: "#f3e8ff",
      200: "#e9d5ff",
      300: "#d8b4fe",
      400: "#c084fc",
      500: "#a855f7",
      600: "#9333ea",
      700: "#7e22ce",
      800: "#6b21a8",
      900: "#581c87",
      950: "#3b0764"
    },
    fuchsia: {
      50: "#fdf4ff",
      100: "#fae8ff",
      200: "#f5d0fe",
      300: "#f0abfc",
      400: "#e879f9",
      500: "#d946ef",
      600: "#c026d3",
      700: "#a21caf",
      800: "#86198f",
      900: "#701a75",
      950: "#4a044e"
    },
    pink: {
      50: "#fdf2f8",
      100: "#fce7f3",
      200: "#fbcfe8",
      300: "#f9a8d4",
      400: "#f472b6",
      500: "#ec4899",
      600: "#db2777",
      700: "#be185d",
      800: "#9d174d",
      900: "#831843",
      950: "#500724"
    },
    rose: {
      50: "#fff1f2",
      100: "#ffe4e6",
      200: "#fecdd3",
      300: "#fda4af",
      400: "#fb7185",
      500: "#f43f5e",
      600: "#e11d48",
      700: "#be123c",
      800: "#9f1239",
      900: "#881337",
      950: "#4c0519"
    }
  },
  semantic: {
    focusRing: {
      width: "1px",
      style: "solid",
      color: "{primary.color}",
      offset: "2px",
      shadow: "none"
    },
    disabledOpacity: "0.6",
    iconSize: "1rem",
    anchorGutter: "2px",
    primary: {
      50: "#fcfdff",
      100: "#f0f6ff",
      200: "#e3f0ff",
      300: "#d7e9fe",
      400: "#cbe2fe",
      500: "#BFDBFE",
      600: "#a2bad8",
      700: "#8699b2",
      800: "#69788c",
      900: "#4c5866",
      950: "#303740",
      contrastColor: "light-dark(#475569, {surface.900})",
      hoverColor: "light-dark({primary.600}, {primary.300})",
      activeColor: "light-dark({primary.700}, {primary.200})"
    },
    formField: {
      paddingX: "0.75rem",
      paddingY: "0.5rem",
      sm: {
        fontSize: "0.875rem",
        paddingX: "0.625rem",
        paddingY: "0.375rem"
      },
      lg: {
        fontSize: "1.125rem",
        paddingX: "0.875rem",
        paddingY: "0.625rem"
      },
      focusRing: {
        width: "0",
        style: "none",
        color: "transparent",
        offset: "0"
      },
      disabledBackground: "light-dark({surface.200}, {surface.700})",
      filledBackground: "light-dark({surface.50}, {surface.800})",
      filledHoverBackground: "light-dark({surface.50}, {surface.800})",
      filledFocusBackground: "light-dark({surface.50}, {surface.800})",
      borderColor: "light-dark({surface.300}, {surface.600})",
      hoverBorderColor: "light-dark({surface.400}, {surface.500})",
      invalidBorderColor: "light-dark({red.400}, {red.300})",
      color: "light-dark({surface.700}, {surface.0})",
      disabledColor: "light-dark({surface.500}, {surface.400})",
      placeholderColor: "light-dark({surface.500}, {surface.400})",
      invalidPlaceholderColor: "light-dark({red.600}, {red.400})",
      floatLabelColor: "light-dark({surface.500}, {surface.400})",
      floatLabelActiveColor: "light-dark({surface.500}, {surface.400})",
      iconColor: "{surface.400}",
      shadow: "0 0 #0000, 0 0 #0000, 0 1px 2px 0 rgba(18, 18, 23, 0.05)"
    },
    list: {
      padding: "0.25rem 0.25rem",
      gap: "2px",
      header: {
        padding: "0.5rem 1rem 0.25rem 1rem"
      },
      option: {
        padding: "0.5rem 0.75rem",
        borderRadius: "{border.radius.sm}",
        icon: {
          color: "light-dark({surface.400}, {surface.500})",
          focusColor: "light-dark({surface.500}, {surface.400})"
        }
      },
      optionGroup: {
        padding: "0.5rem 0.75rem",
        fontWeight: "600",
        color: "{text.muted.color}"
      }
    },
    content: {
      borderRadius: "{border.radius.md}",
      borderColor: "light-dark({surface.200}, {surface.700})"
    },
    mask: {
      transitionDuration: "0.15s",
      background: "light-dark(rgba(0,0,0,0.4), rgba(0,0,0,0.6))"
    },
    navigation: {
      list: {
        padding: "0.25rem 0.25rem",
        gap: "2px"
      },
      item: {
        padding: "0.5rem 0.75rem",
        borderRadius: "{border.radius.sm}",
        activeBackground: "light-dark({surface.100}, {surface.800})",
        icon: {
          color: "light-dark({surface.400}, {surface.500})",
          focusColor: "light-dark({surface.500}, {surface.400})",
          activeColor: "light-dark({surface.500}, {surface.400})"
        }
      },
      submenuLabel: {
        padding: "0.5rem 0.75rem",
        fontWeight: "600",
        color: "{text.muted.color}"
      },
      submenuIcon: {
        size: "0.875rem",
        color: "light-dark({surface.400}, {surface.500})",
        focusColor: "light-dark({surface.500}, {surface.400})",
        activeColor: "light-dark({surface.500}, {surface.400})"
      }
    },
    overlay: {
      select: {
        borderRadius: "{border.radius.md}",
        shadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)",
        borderColor: "light-dark({surface.200}, {surface.700})"
      },
      popover: {
        borderRadius: "{border.radius.md}",
        padding: "0.75rem",
        shadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)",
        borderColor: "light-dark({surface.200}, {surface.700})"
      },
      modal: {
        borderRadius: "{border.radius.xl}",
        shadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
        borderColor: "light-dark({surface.200}, {surface.700})"
      },
      navigation: {
        shadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)"
      }
    },
    surface: {
      50: "light-dark(#f8fafc, #fafafa)",
      100: "light-dark(#f1f5f9, #f4f4f5)",
      200: "light-dark(#e2e8f0, #e4e4e7)",
      300: "light-dark(#cbd5e1, #d4d4d8)",
      400: "light-dark(#94a3b8, #a1a1aa)",
      500: "light-dark(#64748b, #71717a)",
      600: "light-dark(#475569, #52525b)",
      700: "light-dark(#334155, #3f3f46)",
      800: "light-dark(#1e293b, #27272a)",
      900: "light-dark(#0f172a, #18181b)",
      950: "light-dark(#020617, #09090b)"
    },
    highlight: {
      background: "light-dark({primary.50}, color-mix(in srgb, {primary.400}, transparent 84%))",
      focusBackground: "light-dark({primary.100}, color-mix(in srgb, {primary.400}, transparent 76%))"
    },
    text: {
      color: "light-dark(#4C4C4C, {surface.0})",
      hoverColor: "light-dark({surface.800}, {surface.0})",
      mutedColor: "light-dark({surface.500}, {surface.400})",
      hoverMutedColor: "light-dark({surface.600}, {surface.300})"
    }
  }
};
