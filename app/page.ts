import { Color } from "color";
import { EventData } from "data/observable";
import { Button } from "ui/button";
import { Label } from "ui/label";
import { Image } from "ui/image";
import { ScrollView } from "ui/scroll-view";
import { GridLayout, GridUnitType, ItemSpec } from "ui/layouts/grid-layout";
import * as dialogs from "ui/dialogs";
import { Page } from "ui/page";

function isEven(n) {
   return n % 2 == 0;
}

function isOdd(n) {
   return Math.abs(n % 2) == 1;
}

var onTap = function (eventData: EventData) {
  console.log(eventData.eventName, eventData.object.get("id"));
  dialogs.alert(eventData.object.get("id"));
}

export function onPageLoaded(args: EventData) {
  const scroll = new ScrollView();
  const grid = new GridLayout();

  const car_types = [ "convertible", "coupe", "crossover", "sedan", "truck", "van", "wagon" ];

  // Ween need two Columns
  grid.addColumn(new ItemSpec(0, GridUnitType.AUTO));
  grid.addColumn(new ItemSpec(1, GridUnitType.AUTO));

  let rowId: number = 0;
  let columnId: number = 0;
  let imageRowId: number = 0;

  // ---- Structure of Grid before Data
  for (let index = 0; index < car_types.length; index++) {
    const element = car_types[index];

    // Define Item Row
    if (isEven(index) && index != 0) {rowId++};
    console.log(rowId);
    grid.addRow(new ItemSpec(rowId, GridUnitType.AUTO));
    grid.addRow(new ItemSpec(rowId + 1, GridUnitType.AUTO));
  }

  rowId = 0;
  columnId = 0;

  for (let index = 0; index < car_types.length; index++) {
    const element = car_types[index];

    // Label below Car
    const infoLabel = new Label();
    infoLabel.text = element;
    grid.addChild(infoLabel);
    
    // Define Item Row
    if (isEven(index) && index != 0) {
      rowId++;
      rowId++;
    }; 

    imageRowId = rowId + 1;
    console.log(String(rowId), "label", element);
    GridLayout.setRow(infoLabel, rowId);

    // Divide between two Columns
    if (isOdd(index)) 
      {columnId = 0} else 
      {columnId = 1};

    GridLayout.setColumn(infoLabel, columnId);

    // ---- Images -> Cannot bind to tapEvent :(
    // const image = new Image();
    // image.src = "res://" + element;
    // image.height = 140;
    // image.bindingContext = { 
    //   onclick: () => {console.log("www")}
    // };
    // image.addEventListener(Image.propertyChangeEvent,onTap,this);
    // grid.addChild(image);
    // GridLayout.setRow(image, imageRowId);
    // GridLayout.setColumn(image, columnId);

    // ---- Button with background Image
    const button = new Button();
    button.backgroundImage = "res://" + element;
    button.height = 140;
    button.width = 220;
    button.id = element;
    button.on(Button.tapEvent,onTap,this);
    grid.addChild(button);
    GridLayout.setRow(button, imageRowId);
    console.log(String(imageRowId), "image", element);
    GridLayout.setColumn(button, columnId);
  }

  const page = <Page>args.object;
  page.opacity = 50;
  page.content = scroll;
  scroll.content = grid;
}