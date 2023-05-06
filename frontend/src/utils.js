/*
  This file is used to have functions that we want to call multiple times in one file
    so we don't have to rewrite the same functions over in different files, instead
    they can be imported from this file.
*/

//wipes flashdash local storage data from users browser
export function clearUserStorage() {
  localStorage.clear();
}

//checks if the logged in users authentication token is expire
export function isExpired() {
  if (localStorage.getItem("expiry") !== null) {
    //console.log(Date.now() > Date.parse(localStorage.getItem('expiry')));
    return Date.now() > Date.parse(localStorage.getItem("expiry"));
  } else {
    return false;
  }
}

//input: array, index, output: array without value at index
//removes the value from the inputted index from an array by creating a new array with all elements added to that array,
//  as long as the index does not equal the index we want to remove
export function removeFromArr(arr, index) {
  let tempArr = [];
  for (let i = 0; i < arr.length; i++) {
    if (i !== index) {
      tempArr.push(arr[i]);
    }
  }
  return tempArr;
}

//input: array, output: max, min, average of array
//calculates the average value of an array, and returns the average, max, and min of the array
export function average(array) {
  if (array) {
    let sum = 0;
    let max = 0;
    let min = 101;
    for (let i = 0; i < array.length; i++) {
      sum += array[i];
      if (array[i] > max) max = array[i];
      if (array[i] < min) min = array[i];
    }
    return [max, min, sum / array.length];
  }
}

//gets profile of user with username in fetch call
export const fetchProfile = async () => {
  try {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await fetch(
      `https://appstone-flashdash.herokuapp.com/users/profile/user=${localStorage.getItem(
        "username"
      )}/`,
      requestOptions
    );
    const profile = await res.json();
    return profile.lightMode;
  } catch (error) {
    console.log(error);
  }
};

//list of colleges used for our school drop down menu to suggest schools
export const colleges = [
  { value: "HARVARD UNIVERSITY", label: "Harvard University" },
  { value: "PRINCETON UNIVERSITY", label: "Princeton University" },
  { value: "YALE UNIVERSITY", label: "Yale University" },
  { value: "COLUMBIA UNIVERSITY", label: "Columbia University" },
  { value: "STANFORD UNIVERSITY", label: "Stanford University" },
  { value: "UNIVERSITY OF CHICAGO", label: "University of Chicago" },
  { value: "DUKE UNIVERSITY", label: "Duke University" },
  { value: "UNIVERSITY OF PENNSYLVANIA", label: "University of Pennsylvania" },
  {
    value: "CALIFORNIA INSTITUTE OF TECHNOLOGY",
    label: "California Institute of Technology",
  },
  {
    value: "MASSACHUSETTS INSTITUTE OF TECHNOLOGY",
    label: "Massachusetts Institute of Technology",
  },
  { value: "CORNELL UNIVERSITY", label: "Cornell University" },
  { value: "BROWN UNIVERSITY", label: "Brown University" },
  { value: "RICE UNIVERSITY", label: "Rice University" },
  { value: "DARTMOUTH COLLEGE", label: "Dartmouth College" },
  { value: "UNIVERSITY OF NOTRE DAME", label: "University of Notre Dame" },
  { value: "EMORY UNIVERSITY", label: "Emory University" },
  { value: "VANDERBILT UNIVERSITY", label: "Vanderbilt University" },
  {
    value: "UNIVERSITY OF CALIFORNIA-BERKELEY",
    label: "University of California-Berkeley",
  },
  { value: "UNIVERSITY OF VIRGINIA", label: "University of Virginia" },
  {
    value: "UNIVERSITY OF NORTH CAROLINA-CHAPEL HILL",
    label: "University of North Carolina-Chapel Hill",
  },
  { value: "GEORGETOWN UNIVERSITY", label: "Georgetown University" },
  {
    value: "UNIVERSITY OF MICHIGAN-ANN ARBOR",
    label: "University of Michigan-Ann Arbor",
  },
  {
    value: "UNIVERSITY OF CALIFORNIA-LOS ANGELES",
    label: "University of California-Los Angeles",
  },
  { value: "UNIVERSITY OF TEXAS-AUSTIN", label: "University of Texas-Austin" },
  { value: "UNIVERSITY OF FLORIDA", label: "University of Florida" },
  { value: "UNIVERSITY OF GEORGIA", label: "University of Georgia" },
  {
    value: "UNIVERSITY OF ILLINOIS-URBANA-CHAMPAIGN",
    label: "University of Illinois-Urbana-Champaign",
  },
  { value: "UNIVERSITY OF WASHINGTON", label: "University of Washington" },
  { value: "UNIVERSITY OF OREGON", label: "University of Oregon" },
  {
    value: "UNIVERSITY OF MINNESOTA-TWIN CITIES",
    label: "University of Minnesota-Twin Cities",
  },
  { value: "UNIVERSITY OF PITTBURGH", label: "University of Pittsburgh" },
  { value: "UNIVERSITY OF ARIZONA", label: "University of Arizona" },
  { value: "UNIVERSITY OF ARKANSAS", label: "University of Arkansas" },
  { value: "UNIVERSITY OF KANSAS", label: "University of Kansas" },
  { value: "UNIVERSITY OF UTAH", label: "University of Utah" },
  { value: "UNIVERSITY OF ALABAMA", label: "University of Alabama" },
  { value: "UNIVERSITY OF ALASKA", label: "University of Alaska" },
  { value: "UNIVERSITY OF IDAHO", label: "University of Idaho" },
  { value: "UNIVERSITY OF IOWA", label: "University of Iowa" },
  { value: "UNIVERSITY OF KENTUCKY", label: "University of Kentucky" },
  { value: "UNIVERSITY OF LOUISIANA", label: "University of Louisiana" },
  { value: "UNIVERSITY OF MAINE", label: "University of Maine" },
  { value: "UNIVERSITY OF MARYLAND", label: "University of Maryland" },
  {
    value: "UNIVERSITY OF MASSACHUSETTS",
    label: "University of Massachusetts",
  },
  { value: "UNIVERSITY OF MICHIGAN", label: "University of Michigan" },
  { value: "UNIVERSITY OF MISSOURI", label: "University of Missouri" },
  { value: "UNIVERSITY OF MONTANA", label: "University of Montana" },
  { value: "UNIVERSITY OF NEBRASKA", label: "University of Nebraska" },
  {
    value: "UNIVERSITY OF NEW HAMPSHIRE",
    label: "University of New Hampshire",
  },
  { value: "UNIVERSITY OF NEW JERSEY", label: "University of New Jersey" },
  { value: "UNIVERSITY OF NEW MEXICO", label: "University of New Mexico" },
  { value: "UNIVERSITY OF NORTH DAKOTA", label: "University of North Dakota" },
  { value: "UNIVERSITY OF OHIO", label: "University of Ohio" },
  { value: "UNIVERSITY OF OKLAHOMA", label: "University of Oklahoma" },
  { value: "UNIVERSITY OF RHODE ISLAND", label: "University of Rhode Island" },
  {
    value: "UNIVERSITY OF SOUTH CAROLINA",
    label: "University of South Carolina",
  },
  { value: "UNIVERSITY OF SOUTH DAKOTA", label: "University of South Dakota" },
  { value: "UNIVERSITY OF TENNESSEE", label: "University of Tennessee" },
  { value: "UNIVERSITY OF TEXAS", label: "University of Texas" },
  { value: "UNIVERSITY OF VERMONT", label: "University of Vermont" },

  { value: "UNIVERSITY OF WISCONSIN", label: "University of Wisconsin" },
  { value: "UNIVERSITY OF WYOMING", label: "University of Wyoming" },
  { value: "VILLANOVA UNIVERSITY", label: "Villanova University" },
  { value: "VIRGINIA TECH", label: "Virginia Tech" },
  { value: "WAKE FOREST UNIVERSITY", label: "Wake Forest University" },
  {
    value: "WASHINGTON STATE UNIVERSITY",
    label: "Washington State University",
  },
  {
    value: "WASHINGTON UNIVERSITY IN ST. LOUIS",
    label: "Washington University in St. Louis",
  },
  { value: "WAYNE STATE UNIVERSITY", label: "Wayne State University" },
  { value: "WEBER STATE UNIVERSITY", label: "Weber State University" },
  { value: "WELLESLEY COLLEGE", label: "Wellesley College" },
  { value: "WEST VIRGINIA UNIVERSITY", label: "West Virginia University" },
  {
    value: "WESTERN MICHIGAN UNIVERSITY",
    label: "Western Michigan University",
  },
  {
    value: "WESTERN WASHINGTON UNIVERSITY",
    label: "Western Washington University",
  },
  { value: "WESTFIELD STATE UNIVERSITY", label: "Westfield State University" },
  { value: "WHEATON COLLEGE", label: "Wheaton College" },
  { value: "WHEELING JESUIT UNIVERSITY", label: "Wheeling Jesuit University" },
  { value: "WHITMAN COLLEGE", label: "Whitman College" },
  { value: "WHITTIER COLLEGE", label: "Whittier College" },
  { value: "WICHITA STATE UNIVERSITY", label: "Wichita State University" },
  { value: "WIDENER UNIVERSITY", label: "Widener University" },
  { value: "WILLIAM JEWELL COLLEGE", label: "William Jewell College" },
  {
    value: "WILLIAM PATERSON UNIVERSITY",
    label: "William Paterson University",
  },
  { value: "WILLIAMS COLLEGE", label: "Williams College" },
  { value: "WINTHROP UNIVERSITY", label: "Winthrop University" },
  { value: "WOFFORD COLLEGE", label: "Wofford College" },
  { value: "WRIGHT STATE UNIVERSITY", label: "Wright State University" },
  { value: "XAVIER UNIVERSITY", label: "Xavier University" },
  { value: "YESHIVA UNIVERSITY", label: "Yeshiva University" },
  {
    value: "YOUNGSTOWN STATE UNIVERSITY",
    label: "Youngstown State University",
  },
  { value: "ZANE STATE COLLEGE", label: "Zane State College" },
  { value: "ZAPATA COLLEGE", label: "Zapata College" },
  {
    value: "ZAYANTE SANDHILLS LABORATORY",
    label: "Zayante Sandhills Laboratory",
  },
  { value: "ZIMMERMANN COLLEGE", label: "Zimmermann College" },
  { value: "ZION BIBLE COLLEGE", label: "Zion Bible College" },
];
