import { StyleProp, View, ViewStyle, useColorScheme, Text } from "react-native";
import { tw } from "../tailwind";
import { useState } from "react";
import Svg, { Defs, LinearGradient, Path, Stop } from "react-native-svg";
import React from "react";
import * as d3 from "d3";

export type LineGraphProps = {
  data: number[];
  color: string;
  label: string;
  stat: string;
  style?: StyleProp<ViewStyle>;
};

const GRAPH_ASPECT_RATIO = 9 / 16;

export function LineGraph(props: LineGraphProps) {
  const [width, setWidth] = useState(0);

  const height = width * GRAPH_ASPECT_RATIO;
  const graphHeight = (height * 2) / 3;

  const min = Math.min(...props.data);
  const max = Math.max(...props.data);

  const yScale = d3.scaleLinear().domain([min, max]).range([graphHeight, 0]);

  const xScale = d3
    .scaleLinear()
    .domain([0, props.data.length - 1])
    .range([0, width]);

  const lineFn = d3
    .line<number>()
    .x((d, ix) => xScale(ix))
    .y((d, ix) => yScale(d));

  const areaFn = d3
    .area<number>()
    .x((d, ix) => xScale(ix))
    .y0(height)
    .y1((d, ix) => yScale(d));

  const svgLine = lineFn(props.data);
  const svgArea = areaFn(props.data);

  const darkHexColor = tw.color(props.color + "-600");
  const lightHexColor = tw.color(props.color + "-400");
  const nearlyWhiteHexColor = tw.color(props.color + "-100");

  return (
    <View
      style={[tw`bg-neutral-100 rounded-sm`, props.style]}
      onLayout={(ev) => {
        setWidth(ev.nativeEvent.layout.width);
      }}
    >
      <View
        style={[
          tw``,
          {
            height: height - graphHeight,
          },
        ]}
      >
        <View style={[tw`p-4`]}>
          <Text
            numberOfLines={1}
            style={[tw`text-neutral-700 text-xs uppercase font-medium`]}
          >
            {props.label}
          </Text>
          <View style={[tw`flex-row items-end gap-2`]}>
            <Text
              numberOfLines={1}
              adjustsFontSizeToFit
              style={[tw`text-4xl text-black font-bold`]}
            >
              {props.stat}
            </Text>
            <Text
              numberOfLines={1}
              adjustsFontSizeToFit
              style={[tw`text-sm text-red-500 p-1 font-bold`]}
            >
              50%
            </Text>
          </View>
        </View>
      </View>
      <Svg width={width} height={graphHeight}>
        <Defs>
          <LinearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset={"0%"} stopColor={lightHexColor} stopOpacity={1} />
            <Stop
              offset={"100%"}
              stopColor={nearlyWhiteHexColor}
              stopOpacity={0}
            />
          </LinearGradient>
        </Defs>
        <Path d={svgLine} stroke={darkHexColor} fill={"none"} strokeWidth={2} />
        <Path d={svgArea} stroke={"none"} fill={"url(#gradient)"} />
      </Svg>
    </View>
  );
}
