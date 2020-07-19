import {fetchTags}      from './dataContainer';
import {filterTagTable}  from './dataContainer';
import {renderTagTable}  from './tableUtil';
import {paginationSetup} from './tableUtil';
fetchTags("/gateway/json/list/tagsV2");

// Handle filter action
$('#tag-filter').change(function(){
    let tags = filterTagTable();
    renderTagTable(tags);
    paginationSetup(tags.length);
})

$('#plc-filter').change(function(){
    let tags = filterTagTable();
    renderTagTable(tags);
    paginationSetup(tags.length);
})

$('#gateway-filter').change(function(){
    let tags = filterTagTable();
    renderTagTable(tags);
    paginationSetup(tags.length);
})


