import { stubFalse } from "lodash";

function arrayIncludesElements(array: string[], elements: string[]): boolean {
  for (const element of elements)
    if (!array.includes(element)) {
      return false;
    }
  return true;
};

export default arrayIncludesElements;