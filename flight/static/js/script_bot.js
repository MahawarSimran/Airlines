var conversationState = 0;
var userQuery = ""; 
var source = "gyy";
var destination = "";
var weekday = "";

document.getElementById("mysource").innerHTML = source;
document.getElementById("mydestination").innerHTML = destination;


function displayUserMessage(message) {
  var chatContent = document.getElementById("chat-content");

  // Display user message
  var userDiv = document.createElement("div");
  userDiv.className = "user-message";
  userDiv.innerHTML = message;
  chatContent.appendChild(userDiv);
}

function displayBotResponse(response) {
  var chatContent = document.getElementById("chat-content");

  // Display bot response
  var botDiv = document.createElement("div");
  botDiv.className = "bot-message";
  botDiv.innerHTML = response;
  chatContent.appendChild(botDiv);
}
function getBotResponse(userMessage) {
  // You can customize the bot's response based on user input
  // For simplicity, let's just provide some predefined responses
  var botResponse;
  switch (userMessage.toLowerCase()) {
    case 'search flight':
      botResponse = "Sure! What is your departure city?";
      conversationState = 1;
      break;
    case 'flight status':
      botResponse = "Sure! Could you please provide me with either your flight number (for example, AI123) or your PNR number ";
      break;
    case 'booking':
      botResponse = "Sure! Let me assist you with booking.";
      break;
    case 'luggage':
      botResponse = "For luggage-related inquiries, please visit our FAQ section.";
      break;
    case 'cancel ticket':
      botResponse = "To cancel a ticket, please contact our customer support.";
      break;
    case 'status':
      botResponse = "To check your booking status, log in to your account.";
      break;
    case 'search flights':
      botResponse = "Sure! What is your departure city?";
      break;
    case 'travel guide':
      botResponse = "Great! Here is a link to our travel guide.";
      break;
    case 'check status':
      botResponse = "Sure! Please provide your booking details for status checking.";
      break;
    case 'others':
      botResponse = "Sure! If you have other questions, feel free to ask.";
      break;
    default:
      botResponse = "I'm sorry, I didn't understand. How can I assist you?";
      break;
  }

  // Display bot response
  displayBotResponse(botResponse);
}
function handleSearchFlight() {
  var chatContent = document.getElementById("chat-content");

  switch (conversationState) {
    case 1:
      if (isValidCity(userQuery)) {
        source = userQuery;
        document.getElementById("mysource").innerHTML = source;
        displayBotResponse("Great! What is your destination city?");
        conversationState = 2;
        break;
      }
      displayBotResponse(" Entered city is incorrect. Please enter a valid city");
      conversationState = 1;
      break;
    case 2:
      if (isValidCity(userQuery)) {
        destination = userQuery;
        document.getElementById("mydestination").innerHTML = destination;
        displayBotResponse("Awesome! Please enter the date of the flight.");
        conversationState = 3;
        break;
      }
      displayBotResponse("Entered city is incorrect. Please enter a valid city");
      conversationState = 2;
      break;
    case 3:
      if (isDateValid(userQuery)) {
        displayBotResponse("Thank you! Searching for available flights...");
        weekday = 1;
        conversationState = 0;
        displayFlightButtons();
        break;
      }
      displayBotResponse("Entered date is incorrect. Please enter a valid date");
      conversationState = 3;
      break;
    default:
      displayBotResponse("I'm sorry, I didn't understand. How can I assist you?");
      conversationState = 0;
      break;
  }
}
function isDateValid(dateString) {
  // Define a regular expression for date formats like "7 December", "7th December", etc.
  var dateFormat = /^(0?[1-9]|[12][0-9]|3[01])\s*(?:st|nd|rd|th)?\s+(?:January|February|March|April|May|June|July|August|September|October|November|December)$/i;

  // Test if the dateString matches the date format
  return dateFormat.test(dateString);
}

function isValidCity(city) {
  // List of valid cities
  var validCities = ['jaipur', 'bangalore', 'chennai', 'atlanta', 'beijing', 'dubai', 'los angeles', 'chicago', 'london', 'tokyo', 'hong kong', 'shanghai', 'paris', 'amsterdam', 'dallas', 'guangzhou', 'frankfurt', 'istanbul', 'delhi', 'jakarta', 'singapore', 'seoul', 'denver', 'bangkok', 'new york', 'kuala lumpur', 'san francisco', 'madrid', 'chengdu', 'las vegas', 'barcelona', 'mumbai', 'toronto', 'seattle', 'charlotte', 'shenzhen', 'taipei', 'mexico city', 'kunming', 'munich', 'orlando', 'miami', 'phoenix', 'sydney', 'newark', 'manila', 'rome', 'houston', 'moscow', 'chongqing', 'minneapolis', 'sao paulo', 'boston', 'hangzhou', 'detroit', 'jeddah', 'melbourne', 'fort lauderdale', 'bogota', 'cheju', 'philadelphia', 'dublin', 'zurich', 'copenhagen', 'osaka', 'palma de mallorca', 'manchester', 'oslo', 'lisbon', 'stockholm', 'baltimore', 'antalya', 'london', 'nanjing', 'seoul', 'bangalore', 'riyadh', 'brussels', 'duesseldorf',  'vienna', 'zhengzhou', 'salt lake city', 'vancouver', 'washington', 'changcha', 'abu dhabi', 'cancun', 'fukuoka', 'wuhan', 'hanoi', 'sapporo', 'washington', 'denpasar', 'haikou', 'chicago', 'santiago', 'san diego', 'milano', 'lima', 'surabaya', 'sao paulo', 'athens', 'urumqi', 'johannesburg', 'sanya', 'tel-aviv', 'tianjin', 'okinawa', 'berlin', 'kolkata', 'honolulu', 'tampa', 'madras', 'portland', 'auckland', 'helsinki', 'harbin', 'malaga', 'montreal', 'moscow', 'guiyang', 'hamburg', 'dalian', 'teheran', 'geneva', 'shenyang', 'hyderabad', 'brasilia', 'phuket', 'busan', 'calgary', 'rio de janeiro', 'st. petersburg', 'ankara', 'london', 'warsaw', 'panama city', 'dallas', 'prague', 'st. louis', 'osaka', 'jinan', 'nashville', 'nanning', 'austin', 'buenos aires', 'perth', 'alicante', 'houston', 'edinburgh', 'nice', 'budapest', 'gran canaria', 'oakland', 'birmingham', 'taiyuan', 'berlin', 'izmir', 'lanzhou', 'cape town', 'kochi', 'rio de janeiro',  'pittsburgh', 'pune',  'ahmedabad', 'nairobi', 'goa', 'wuxi', 'christchurch', 'yantai', 'sofia', 'kaohsiung', 'coolangatta', 'windsor locks', 'thessaloniki', 'lagos', 'batam', 'west palm beach', 'madinah', 'bordeaux', 'taipei', 'quanzhou', 'bergen', 'riga', 'fuerteventura', 'wellington', 'malta', 'beijing', 'fortaleza', 'yangon', 'rome', 'hannover', 'belfast', 'krakow', 'palermo', 'havana', 'sochi', 'tunis', 'palembang', 'eindhoven', 'xining', 'adana', 'jacksonville', 'durban', 'nantes', 'yekaterinburg', 'newcastle', 'belgrade', 'lucknow', 'kanpur', 'nagpur', 'indore', 'thane', 'bhopal'];
  return validCities.includes(city.toLowerCase());
}

function sendButtonAction(userMessage) {
  var botResponse;
  displayUserMessage(userMessage);
  switch (userMessage.toLowerCase()) {
    case 'booking':
      botResponse = "Sure! Let me assist you with booking.";
      displayBotResponse(botResponse);
      break;
    case 'search flight':
      displayBotResponse("Sure! What is your departure city?");
      userQuery = document.getElementById("chat-content");
      conversationState = 1;
      handleSearchFlight();
      displayBotResponse(botResponse);
      break;
    case 'flight status':
      botResponse = "Sure! Please provide your booking details for status checking.";
      displayBotResponse(botResponse);
      break;
    case 'check booking':
      botResponse = "To check your booking status, log in to your account.";
      displayBotResponse(botResponse);
      break;
    case 'travel guide':
      botResponse = "Great! Here are some travel guide options.";
      displayBotResponse(botResponse);
      displayTravelButtons();
      break;
    case 'luggage':
      botResponse = "Sure, I'd be happy to help with your luggage-related queries. We have specific guidelines for both carry-on and checked baggage.";
      displayBotResponse(botResponse);
      displayLuggageButtons();
      break;
    case 'health':
      botResponse = "Is there a specific health or medical assistance service you're interested in or any particular query you have?";
      displayBotResponse(botResponse);
      displayHealthButtons();
      break;
    case 'others':
      botResponse = "Sure! If you have other questions, feel free to ask.";
      displayBotResponse(botResponse);
      break;
    default:
      botResponse = "I'm sorry, I didn't understand. How can I assist you?";
      displayBotResponse(botResponse);
      break;
      
  }

  // Display bot response
}

function luggagesendButtonAction(userMessage) {
  var botResponse;
  displayUserMessage(userMessage);
  switch (userMessage.toLowerCase()) {
    case 'carry-on baggage':
      botResponse = "Certainly! Carry-on baggage refers to the luggage that passengers are allowed to bring into the airplane cabin with them. It typically includes items like a small suitcase, laptop bag, or backpack. Please make sure your carry-on items comply with the airline's size and weight restrictions. If you have specific questions about carry-on baggage policies, feel free to ask.";
      displayBotResponse(botResponse);
      break;
    case 'checked baggage':
      botResponse = "Certainly! Checked baggage is the luggage that passengers hand over to the airline during check-in. It is stored in the cargo hold of the aircraft. Airlines have specific guidelines regarding the weight, size, and number of checked bags allowed. If you need information about checked baggage policies, please provide your airline details, and I'll be happy to assist.";
      displayBotResponse(botResponse);
      break;
    case 'restricted items':
      botResponse = "Sure, I'd be happy to help with your luggage-related queries. Airlines have restrictions on carrying certain items in both carry-on and checked baggage. These restrictions are in place for safety and security reasons. If you have specific questions about restricted items, please let me know.";
      displayBotResponse(botResponse);
      break;
    case 'lost baggage':
      botResponse = "I'm sorry to hear that your baggage is lost. To assist you, please provide your airline and booking details. Additionally, report the loss to the airline's lost and found department as soon as possible. They will guide you through the process of locating and recovering your lost baggage.";
      displayBotResponse(botResponse);
      break;
    case 'track your bags':
      botResponse = "To track your bags, you'll need the tracking number provided by the airline during check-in. Use the airline's official website or contact their customer support to input the tracking number and get real-time updates on your baggage location. If you have the tracking number, please provide it for more accurate assistance.";
      displayBotResponse(botResponse);
      break;
    case 'unaccompanied baggage':
      botResponse = "Unaccompanied baggage is when passengers send their luggage separately from their own travel. This service is often used for shipping items or when baggage needs to arrive at a different time. If you have questions about sending unaccompanied baggage, please provide more details, and I'll assist you accordingly.";
      displayBotResponse(botResponse);
      break;
    default:
      botResponse = "I'm sorry, I didn't understand. How can I assist you?";
      displayBotResponse(botResponse);
      break;
  }
}

function healthsendButtonAction(userMessage) {
  var botResponse;
  displayUserMessage(userMessage);
  switch (userMessage.toLowerCase()) {
    case 'medical assistance':
      botResponse = "Our cabin crew is trained in advanced first aid and life support. Our medical kits are recognised and approved as per international medical guidelines, which can be administered by our cabin crew and by a doctor or nurse who may be on board and willing to assist if the situation demands.";
      displayBotResponse(botResponse);
      break;
    case 'wheelchair assistance':
      botResponse = "We offer dedicated wheelchair assistance to ensure a seamless journey. If you need a wheelchair, you can let us know at the time of your reservation, ticketing of the booking. Travellers are requested to pre-book wheelchairs during booking or ticket issuance to avoid last-minute delays and the unavailability of wheelchairs";
      displayBotResponse(botResponse);
      break;
    case 'emergency':
      botResponse = "In case of emergencies, please call our emergency contact number: +1 (555) 123-4567";
      displayBotResponse(botResponse);
      break;
    default:
      botResponse = "I'm sorry, I didn't understand. How can I assist you?";
      displayBotResponse(botResponse);
      break;
      
  }
}

function travelSendButtonAction(userMessage) {
  var botResponse;
  displayUserMessage(userMessage);
  switch (userMessage.toLowerCase()) {
    case 'documents to carry':
      botResponse = "Certainly! When traveling, it's essential to carry necessary documents, including a valid passport, visa (if required), airline tickets, and any other identification documents. Make sure to check the specific document requirements for your destination country. If you have questions about specific documents or need more information, feel free to ask.";
      displayBotResponse(botResponse);
      break;
    case 'where we fly':
      botResponse = "Our airline operates flights to various destinations around the world. To check the list of destinations we fly to, you can visit our official website or contact our customer support. If you have a specific destination in mind or need assistance with travel planning, let me know!";
      displayBotResponse(botResponse);
      break;
    case 'first time flyer':
      botResponse = "Welcome aboard! If you're a first-time flyer, we're here to make your journey smooth and enjoyable. Feel free to ask any questions you may have, whether it's about the check-in process, security procedures, or anything else. We're here to help!";
      displayBotResponse(botResponse);
      break;
    case 'popular destinations':
      botResponse = "Our airline offers flights to a variety of popular destinations known for their unique attractions and experiences. If you have a specific destination in mind or need recommendations, feel free to let me know. These are some popular destinations.\n <a href='https://www.tripadvisor.in/TravelersChoice-Destinations-cTop-g1' target='_blank'>Popular Destinations</a>";
      displayBotResponse(botResponse);
      break;
    case 'travelling while pregnant':
      botResponse = "If you're planning to travel while pregnant, it's advisable to consult with your healthcare provider before making any arrangements. Airlines may have specific guidelines regarding pregnant travelers, such as travel restrictions based on the stage of pregnancy. If you have specific concerns or questions, please provide more details.";
      displayBotResponse(botResponse);
      break;
    default:
      botResponse = "I'm sorry, I didn't understand. How can I assist you?";
      displayBotResponse(botResponse);
      break;
  }
}


function sendMessage() {
  var userMessage = document.getElementById("user-message").value.trim();
  userQuery = userMessage;  // Update userQuery with user's input
  displayUserMessage(userMessage);

  if (conversationState > 0) {
    handleSearchFlight();
    // conversationState = 0; // Reset the conversation state
  } else {
    // Simulate the bot's response based on user input
    getBotResponse(userMessage);
  }

  // Clear the input field
  document.getElementById("user-message").value = "";
}

function displayFlightBox(flightDetails) {
  var flightDisplay = document.getElementById("flight-display");
  flightDisplay.style.display = "block";

  var flightBox = document.createElement("div");
  flightBox.id = "flight-box";
  flightBox.innerHTML = `
    <div class="each-flight-div-box show">
        <div class="each-flight-div" onclick="media_click(this)">
            <div class="flight-company">
                <div class="flight-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" focusable="false" width="1.5em" height="1.3em" style="-ms-transform: rotate(360deg); -webkit-transform: rotate(360deg); transform: rotate(360deg);" preserveAspectRatio="xMidYMid meet" viewBox="0 0 440 384"><path d="M14 335h405v43H14v-43zm417.5-199.5q3.5 12.5-3 24T409 175l-114 30l-92 25l-114 30l-34 10l-16-29l-39-67l31-9l42 33l106-28L91 17l41-11l147 137l113-30q13-4 24.5 3t15 19.5z" fill="#434445"/><rect x="0" y="0" width="440" height="384" fill="rgba(0, 0, 0, 0)" /></svg>
                </div>
                <div class="company-details">
                    <div class="company-name">AirIndia</div>
                    <div class="plane-name">AI8989</div>
                </div>
            </div>
            <div class="flight-time flight-time-div">
                <div class="flight-origin-time">
                    <div class="flight-time">
                        <h5>3:03</h5>
                    </div>
                    <div class="flight-place">
                      ${flightDetails.source} 
                    </div>
                </div>
                <div class="flight-stops tooltip">
                    <svg xmlns="http://www.w3.org/2000/svg" width="34" height="24" viewBox="0 0 24 24">
                        <path d="M13,9.03544443 C14.6961471,9.27805926 16,10.736764 16,12.5 C16,14.263236 14.6961471,15.7219407 13,15.9645556 L13,21.5207973 C13,21.7969397 12.7761424,22.0207973 12.5,22.0207973 C12.2238576,22.0207973 12,21.7969397 12,21.5207973 L12,15.9645556 C10.3038529,15.7219407 9,14.263236 9,12.5 C9,10.736764 10.3038529,9.27805926 12,9.03544443 L12,3.5 C12,3.22385763 12.2238576,3 12.5,3 C12.7761424,3 13,3.22385763 13,3.5 L13,9.03544443 L13,9.03544443 Z M12.5,15 C13.8807119,15 15,13.8807119 15,12.5 C15,11.1192881 13.8807119,10 12.5,10 C11.1192881,10 10,11.1192881 10,12.5 C10,13.8807119 11.1192881,15 12.5,15 Z" transform="rotate(90 12.5 12.51)"/>
                    </svg>
                    <span class="tooltiptext" data-value="10 hrs 6 mins"></span><!--07 hrs 50 mins-->
                </div>
                <div class="flight-destination-time">
                    <div class="flight-time">
                        <h5>10:00</h5>
                    </div>
                    <div class="flight-place">
                      ${flightDetails.destination} 
                    </div>
                </div>
            </div>
            <div class="flight-details">
                <div class="flight-price">
                    <h5>
                        ₹ 
                        <span>
                            8000
                        </span>
                    </h5>
                </div>
            </div>
        </div>
    </div>
  `;

  flightDisplay.appendChild(flightBox);
}


function displayFlightButtons() {
  const chatContent = document.getElementById('chat-content');
  const flightButtonsContainer = document.getElementById('flight-display');
  flightButtonsContainer.style.display = "block";
  chatContent.appendChild(flightButtonsContainer);
}
function displayHealthButtons() {
  const chatContent = document.getElementById('chat-content');
  const healthButtonsContainer = document.getElementById('health-buttons-container');
  // Set the style to block to make it visible
  healthButtonsContainer.style.display = "block";
  // Append health buttons container after the last message
  chatContent.appendChild(healthButtonsContainer);
  // handleHealthOption(userQuery)
}

function displayLuggageButtons() {
  const chatContent = document.getElementById('chat-content');
  const luggageButtonsContainer = document.getElementById('luggage-buttons-container');
  luggageButtonsContainer.style.display = "block";
  chatContent.appendChild(luggageButtonsContainer);
}

function displayTravelButtons() {
  const chatContent = document.getElementById('chat-content');
  const travelButtonsContainer = document.getElementById('travel-buttons-container');
  travelButtonsContainer.style.display = "block";
  chatContent.appendChild(travelButtonsContainer);
}




document.addEventListener('DOMContentLoaded', function () {
  const chatIcon = document.getElementById('chatIcon');
  const chatBox = document.getElementById('chatBox');
  const chatContent = document.getElementById('chat-content');
  const chatInput = document.getElementById('user-message');


  chatIcon.addEventListener('click', function () {
    chatBox.style.display = chatBox.style.display === 'none' ? 'block' : 'none';
  });

  // Attach the sendMessage function to the button click
  const sendButton = document.getElementById('sendButton');
  sendButton.addEventListener('click', sendMessage);

});