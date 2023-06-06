
function showAddBar(){
    document.getElementById('addBar').hidden = false;
    document.getElementById('topRightSide').className = "row topRightSideshowedAddBar";
}
function addMetric(event){
    event.preventDefault();
    document.getElementById('addBar').hidden = true;
    document.getElementById('topRightSide').className = "row topRightSide";
    var list = document.getElementById('metricList');
    var title = document.getElementById('title').value;
    var description = document.getElementById('description').value;
    var comment = document.getElementById('comment').value;
    var rating = document.getElementById('rating').value;
    var metricId = document.getElementById('metric-id').value;
    if (null === metricId || metricId.length == 0) {
      metricId = 'list-group-item-' + list.getElementsByClassName('list-group-item').length;
    }
    
    document.getElementById('addForm').reset();
    if(document.getElementById(metricId)) {
        document.getElementById(metricId).remove();
    }
    var newMetric = document.createElement('li');
    var buttonDiv = document.createElement('div');
    var textDiv = document.createElement('div');
    var editButton = document.createElement('Button');
    var listDiv = document.createElement('div');
    listDiv.className = "row";
    textDiv.className = "col-8 textDiv";
    buttonDiv.className = " col-4 d-grid gap-2 d-md-flex justify-content-md-end";
    editButton.className = "btn btn-outline-secondary editButton";
    editButton.innerHTML = "Edit";
    var deleteButton = document.createElement('Button');
    deleteButton.className = "btn btn-outline-secondary deleteButton";
    deleteButton.innerHTML = "Delete";
    editButton.setAttribute('onClick','editMetric("' + metricId + '")');
    deleteButton.setAttribute('onClick','deleteMetric("' + metricId + '")');
    newMetric.setAttribute('id', metricId);
    newMetric.setAttribute('x-data-title', title);
    newMetric.setAttribute('x-data-description', description);
    newMetric.setAttribute('x-data-comment', comment);
    newMetric.setAttribute('x-data-rating', rating);
    newMetric.className = "list-group-item newMetric";
    textDiv.innerHTML = "Title: " + title + " Description: " + description + " Comment: " + comment + " Rating: " + rating;
    buttonDiv.appendChild(editButton);
    buttonDiv.appendChild(deleteButton);
    listDiv.appendChild(textDiv);
    listDiv.appendChild(buttonDiv);
    newMetric.appendChild(listDiv);
    var list = document.getElementById('metricList');
    list.appendChild(newMetric);
}
function editMetric(metricId){
    var metricElement = document.getElementById(metricId);
    var title = metricElement.getAttribute('x-data-title');
    var description = metricElement.getAttribute('x-data-description');
    var comment = metricElement.getAttribute('x-data-comment');
    var rating = metricElement.getAttribute('x-data-rating');
    document.getElementById('title').value = title;
    document.getElementById('description').value = description;
    document.getElementById('comment').value = comment;
    document.getElementById('rating').value = rating;
    document.getElementById('metric-id').value = metricId;
    showAddBar();
}
function deleteMetric(metricId){
    var metricElement = document.getElementById(metricId);
    metricElement.remove();
}
function cancel(){
    document.getElementById('addBar').hidden = true;
    document.getElementById('topRightSide').className = "row topRightSide";
    document.getElementById('addForm').reset();
}