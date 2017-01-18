xquery version "3.1";

let $csv :=
  fetch:text("https://raw.githubusercontent.com/pmetzner/stolpersteine/master/stolpersteine.tsv")
  => csv:parse(map {'header':'yes', 'separator' : 'tab'})
let $json :=
  <json type="object">
    <type>FeatureCollection</type>
    <features type="array">
    {
    for $record in $csv/csv/record
    return
    <_ type="object">
       <type>Feature</type>
       <properties type="object">
          {$record/name, $record/address, $record/deport, $record/murder, $record/death}
        </properties>
        <geometry type="object">
          <type>Point</type>
          <coordinates type="array">
             <_ type="number">{$record/lng/string()}</_>
             <_ type="number">{$record/lat/string()}</_>
          </coordinates>
      </geometry>
      </_>
  }</features></json>
return json:serialize($json)
