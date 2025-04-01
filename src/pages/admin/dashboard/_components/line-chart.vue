<script setup lang="ts">
import type { Line } from "@/types/line";
import {
  VisXYContainer,
  VisLine,
  VisAxis,
  VisTooltip,
  VisScatter,
} from "@unovis/vue";
import { Scatter } from "@unovis/ts";

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const triggers = {
  [Scatter.selectors.point]: (d: any) => `Income: ${d.total}`,
};

const props = defineProps<{ data: Line[] }>();
</script>

<template>
  <div class="w-full flex flex-col gap-8">
    <label class="text-xl font-bold">Monthly Income Overview</label>
    <VisXYContainer>
      <!-- Line Chart -->
      <VisLine
        :data="props.data"
        :x="(d: Line) => d.month"
        :y="(d: Line) => d.total"
      />

      <!-- Scatter Plot -->
      <VisScatter
        :data="props.data"
        :x="(d: Line) => d.month"
        :y="(d: Line) => d.total"
      />

      <!-- X-Axis -->
      <VisAxis
        type="x"
        label="Month"
        :tickFormat="(val: number) => monthNames[val - 1]"
        :numTicks="props.data.length"
      />

      <VisAxis type="y" label="Income" />

      <VisTooltip :triggers="triggers" :verticalShift="10" />
    </VisXYContainer>
  </div>
</template>
