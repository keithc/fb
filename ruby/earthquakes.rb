require 'time' 

class Earthquake
	attr_accessor :date, :latitude, :longitude, :magnitude, :depth
	def initialize(date, latitude, longitude, magnitude, depth)
		@date = date
		@latitude = latitude
		@longitude = longitude
		@magnitude = magnitude
		@depth = depth
	end
	#create a to_s
end 

class Location
	attr_accessor :zip, :city, :state, :latitude, :longitude, :timeZone, :dstFlag
	def initialize(zip, city, state, latitude, longitude, timeZone, dstFlag) 
		@zip = zip
		@city = city
		@state = state
		@latitude = latitude.slice(latitude.index('.')+1,3)  #cheating since I know earthquake lat/long is 3 significant digits
		@longitude = longitude.slice(latitude.index('.')+1,3)
		@timeZone = timeZone
	end
	
end



#helper
def WriteMessage(message, showTime=true) 
	message.insert(0," ::")
	puts showTime ? Time.new.to_s + message: message 
end

#going to be a helper for date when i find a library that supports any date
def ReturnReplacementIfEmpty(valToCheck, replaceWithThis)
	valToCheck.strip.empty? ? replaceWithThis : valToCheck.strip
end

rawEQData=[];
rawZipData=[]; 
 #Earthquake.getData or something
#todo: http://snippets.aktagon.com/snippets/246-How-to-parse-CSV-data-with-Ruby
WriteMessage("Reading earthquakes file", true)

File.open('earthquakes.csv','r') do |myFile|
	rawEQData = myFile.readlines
end

WriteMessage(rawEQData.length.to_s + " earthquakes read.")
WriteMessage("Parsing EQ data into objects"); 

#eqs array
earthquakes =[]

#regex to parse eq data
eqRegex = /(\d{4}),(\d{0,2}\s*),(\d{0,2}\s*),(\d*.\d*\s*),([\s-]*\d+\.\d*),([\s-]*\d+.\d*),(\s*|\d.\d)?,(\s*\d*),(\w*)/
#csv_data.split(/(,|\r\n|\n|\r)(?=(?:[^\"]*\"[^\"]*\")*(?![^\"]*\"))/m).each do |csv|
#eqRegex = /(?:^|,)(\"(?:[^\"]+|\"\")*\"|[^,]*)/
rawEQData.each do |eqLine|
	matchData = eqRegex.match eqLine
	if matchData 
		# irb(main):020:0> Time.parse('19901111093332').strftime('%H%M on %d/%b/%y')
		#=> "0933 on 11/Nov/90"
		#matchdata[0] is the original string
		#puts matchData[1] + '=' + matchData[2] + '=' + matchData[3] + '=' + matchData[4]+ '=' + matchData[5]+ '=' + matchData[6]
		eqYear, eqMonth, eqDay, eqTime = ReturnReplacementIfEmpty(matchData[1],'1900'), ReturnReplacementIfEmpty(matchData[2],'1'), ReturnReplacementIfEmpty(matchData[3],'1'), ReturnReplacementIfEmpty(matchData[4],'')
		#puts eqYear + eqMonth + eqDay + eqTime
		#eqDate = Time.parse(eqYear + eqMonth + eqDay + eqTime)  #dates won't go back to the 1500's - maybe another library? 
		eqDate = eqYear + "-" + eqMonth + "-" + eqDay + ":" + eqTime
		earthquake = Earthquake.new(eqDate, matchData[5], matchData[6], matchData[7],matchData[8])
		earthquakes.push(earthquake)
	end
end  #end eq parse


WriteMessage("Reading zipcode file", true)

File.open('zipcode.csv','r') do |myFile|
	rawZipData = myFile.readlines
end

WriteMessage(rawZipData.length.to_s + " zipcodes read.")
WriteMessage("Parsing Zip data into objects"); 

#zip array
locations = []
zipRegex = /\"([\w\s.-]*)\"/
firstLine = true
rawZipData.each do |zipLine|
	matchData = zipRegex.match zipLine
	#"00210","Portsmouth","NH","43.005895","-71.013202","-5","1"
	if matchData && !firstLine
		#super lame, fix this in the regex
		puts matchData[0]
		zip = Location.new(matchData[1],matchData[2],matchData[3],matchData[4],matchData[5],matchData[6],matchData[7])
		locations.push(zip)
	end
	firstLine = false
end
#puts earthquakes.length
puts locations.length
locations.each do |loc| 
	loc.latitude
end 

WriteMessage("Finding cities for quakes"); 
earthquakes.each do |earthquake|
	#puts earthquake.date + ":" + earthquake.magnitude + ":" + earthquake.latitude
	thisLoc = locations.find{|location| location.latitude == earthquake.latitude && location.longitude == earthquake.latitude}
	if thisLoc 
		puts "FOUND!" + thisLoc.city
	end
end
#earthquakes.each{|line| print line}

#rawEQData.each {|line| print line }
#rawZipData.each {|line| print line }