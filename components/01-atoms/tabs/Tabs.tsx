import { Tab, Tabs, Typography } from "@mui/material";

const CodexTabs = ({
  items,
  index,
  setIndex,
  ...others
}: {
  items: string[];
  index: number;
  setIndex: (newIndex: number) => void;
}) => {
  return (
    <Tabs
      className="bg-gray-200 p-2 codex-tab rounded-md"
      value={index}
      onChange={(_, newValue: number) => {
        setIndex(newValue);
      }}
      TabIndicatorProps={{
        style: {
          height: "0px",
        },
      }}
      aria-label="basic tabs example"
      {...others}
    >
      {items.map((item, value) => {
        return (
          <Tab
            key={item}
            id={item}
            className="bg-gray-200 p-2 rounded-md"
            label={<Typography sx={{ fontSize: "12px" }}>{item}</Typography>}
            value={value}
            sx={{
              textTransform: "none",
              minHeight: "auto",
              paddingX: "12px",
              paddingY: "6px",
            }}
          />
        );
      })}
    </Tabs>
  );
};

export default CodexTabs;
