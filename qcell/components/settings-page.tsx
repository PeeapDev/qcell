"use client"

import { useState, useEffect, useRef, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from 'next/image'

type SettingSection = "general" | "security" | "notifications" | "privacy"

interface SettingsPageProps {
  onSettingsChange: (logo: string, title: string, timeFormat: string, googleMapsApiKey: string) => void;
  defaultLogo: string;
  currentLogo: string;
  currentTitle: string;
  currentTimeFormat: string;
  currentGoogleMapsApiKey: string;
}

// Add this type for country data
type Country = {
  name: string;
  latitude: number;
  longitude: number;
}

// Updated list of countries with their coordinates
const allCountries: Country[] = [
  { name: "Afghanistan", latitude: 33.93911, longitude: 67.709953 },
  { name: "Albania", latitude: 41.153332, longitude: 20.168331 },
  { name: "Algeria", latitude: 28.033886, longitude: 1.659626 },
  { name: "Andorra", latitude: 42.546245, longitude: 1.601554 },
  { name: "Angola", latitude: -11.202692, longitude: 17.873887 },
  { name: "Antigua and Barbuda", latitude: 17.060816, longitude: -61.796428 },
  { name: "Argentina", latitude: -38.416097, longitude: -63.616672 },
  { name: "Armenia", latitude: 40.069099, longitude: 45.038189 },
  { name: "Australia", latitude: -25.274398, longitude: 133.775136 },
  { name: "Austria", latitude: 47.516231, longitude: 14.550072 },
  { name: "Azerbaijan", latitude: 40.143105, longitude: 47.576927 },
  { name: "Bahamas", latitude: 25.03428, longitude: -77.39628 },
  { name: "Bahrain", latitude: 26.0667, longitude: 50.5577 },
  { name: "Bangladesh", latitude: 23.684994, longitude: 90.356331 },
  { name: "Barbados", latitude: 13.193887, longitude: -59.543198 },
  { name: "Belarus", latitude: 53.709807, longitude: 27.953389 },
  { name: "Belgium", latitude: 50.503887, longitude: 4.469936 },
  { name: "Belize", latitude: 17.189877, longitude: -88.49765 },
  { name: "Benin", latitude: 9.30769, longitude: 2.315834 },
  { name: "Bhutan", latitude: 27.514162, longitude: 90.433601 },
  { name: "Bolivia", latitude: -16.290154, longitude: -63.588653 },
  { name: "Bosnia and Herzegovina", latitude: 43.915886, longitude: 17.679076 },
  { name: "Botswana", latitude: -22.328474, longitude: 24.684866 },
  { name: "Brazil", latitude: -14.235004, longitude: -51.92528 },
  { name: "Brunei", latitude: 4.535277, longitude: 114.727669 },
  { name: "Bulgaria", latitude: 42.733883, longitude: 25.48583 },
  { name: "Burkina Faso", latitude: 12.238333, longitude: -1.561593 },
  { name: "Burundi", latitude: -3.373056, longitude: 29.918886 },
  { name: "Cabo Verde", latitude: 16.002082, longitude: -24.013197 },
  { name: "Cambodia", latitude: 12.565679, longitude: 104.990963 },
  { name: "Cameroon", latitude: 7.369722, longitude: 12.354722 },
  { name: "Canada", latitude: 56.130366, longitude: -106.346771 },
  { name: "Central African Republic", latitude: 6.611111, longitude: 20.939444 },
  { name: "Chad", latitude: 15.454166, longitude: 18.732207 },
  { name: "Chile", latitude: -35.675147, longitude: -71.542969 },
  { name: "China", latitude: 35.86166, longitude: 104.195397 },
  { name: "Colombia", latitude: 4.570868, longitude: -74.297333 },
  { name: "Comoros", latitude: -11.875001, longitude: 43.872219 },
  { name: "Congo (Congo-Brazzaville)", latitude: -0.228021, longitude: 15.827659 },
  { name: "Congo (Democratic Republic of the)", latitude: -4.038333, longitude: 21.758664 },
  { name: "Costa Rica", latitude: 9.748917, longitude: -83.753428 },
  { name: "Croatia", latitude: 45.1, longitude: 15.2 },
  { name: "Cuba", latitude: 21.521757, longitude: -77.781167 },
  { name: "Cyprus", latitude: 35.126413, longitude: 33.429859 },
  { name: "Czech Republic", latitude: 49.817492, longitude: 15.472962 },
  { name: "Denmark", latitude: 56.26392, longitude: 9.501785 },
  { name: "Djibouti", latitude: 11.825138, longitude: 42.590275 },
  { name: "Dominica", latitude: 15.414999, longitude: -61.370976 },
  { name: "Dominican Republic", latitude: 18.735693, longitude: -70.162651 },
  { name: "East Timor (Timor-Leste)", latitude: -8.874217, longitude: 125.727539 },
  { name: "Ecuador", latitude: -1.831239, longitude: -78.183406 },
  { name: "Egypt", latitude: 26.820553, longitude: 30.802498 },
  { name: "El Salvador", latitude: 13.794185, longitude: -88.89653 },
  { name: "Equatorial Guinea", latitude: 1.650801, longitude: 10.267895 },
  { name: "Eritrea", latitude: 15.179384, longitude: 39.782334 },
  { name: "Estonia", latitude: 58.595272, longitude: 25.013607 },
  { name: "Eswatini (Swaziland)", latitude: -26.522503, longitude: 31.465866 },
  { name: "Ethiopia", latitude: 9.145, longitude: 40.489673 },
  { name: "Fiji", latitude: -17.713371, longitude: 178.065032 },
  { name: "Finland", latitude: 61.92411, longitude: 25.748151 },
  { name: "France", latitude: 46.227638, longitude: 2.213749 },
  { name: "Gabon", latitude: -0.803689, longitude: 11.609444 },
  { name: "Gambia", latitude: 13.443182, longitude: -15.310139 },
  { name: "Georgia", latitude: 42.315407, longitude: 43.356892 },
  { name: "Germany", latitude: 51.165691, longitude: 10.451526 },
  { name: "Ghana", latitude: 7.946527, longitude: -1.023194 },
  { name: "Greece", latitude: 39.074208, longitude: 21.824312 },
  { name: "Grenada", latitude: 12.262776, longitude: -61.604171 },
  { name: "Guatemala", latitude: 15.783471, longitude: -90.230759 },
  { name: "Guinea", latitude: 9.945587, longitude: -9.696645 },
  { name: "Guinea-Bissau", latitude: 11.803749, longitude: -15.180413 },
  { name: "Guyana", latitude: 4.860416, longitude: -58.93018 },
  { name: "Haiti", latitude: 18.971187, longitude: -72.285215 },
  { name: "Honduras", latitude: 15.199999, longitude: -86.241905 },
  { name: "Hungary", latitude: 47.162494, longitude: 19.503304 },
  { name: "Iceland", latitude: 64.963051, longitude: -19.020835 },
  { name: "India", latitude: 20.593684, longitude: 78.96288 },
  { name: "Indonesia", latitude: -0.789275, longitude: 113.921327 },
  { name: "Iran", latitude: 32.427908, longitude: 53.688046 },
  { name: "Iraq", latitude: 33.223191, longitude: 43.679291 },
  { name: "Ireland", latitude: 53.41291, longitude: -8.24389 },
  { name: "Israel", latitude: 31.046051, longitude: 34.851612 },
  { name: "Italy", latitude: 41.87194, longitude: 12.56738 },
  { name: "Ivory Coast", latitude: 7.539989, longitude: -5.54708 },
  { name: "Jamaica", latitude: 18.109581, longitude: -77.297508 },
  { name: "Japan", latitude: 36.204824, longitude: 138.252924 },
  { name: "Jordan", latitude: 30.585164, longitude: 36.238414 },
  { name: "Kazakhstan", latitude: 48.019573, longitude: 66.923684 },
  { name: "Kenya", latitude: -0.023559, longitude: 37.906193 },
  { name: "Kiribati", latitude: -3.370417, longitude: -168.734039 },
  { name: "Korea (North)", latitude: 40.339852, longitude: 127.510093 },
  { name: "Korea (South)", latitude: 35.907757, longitude: 127.766922 },
  { name: "Kuwait", latitude: 29.31166, longitude: 47.481766 },
  { name: "Kyrgyzstan", latitude: 41.20438, longitude: 74.766098 },
  { name: "Laos", latitude: 19.85627, longitude: 102.495496 },
  { name: "Latvia", latitude: 56.879635, longitude: 24.603189 },
  { name: "Lebanon", latitude: 33.854721, longitude: 35.862285 },
  { name: "Lesotho", latitude: -29.609988, longitude: 28.233608 },
  { name: "Liberia", latitude: 6.428055, longitude: -9.429499 },
  { name: "Libya", latitude: 26.3351, longitude: 17.228331 },
  { name: "Liechtenstein", latitude: 47.166, longitude: 9.555373 },
  { name: "Lithuania", latitude: 55.169438, longitude: 23.881275 },
  { name: "Luxembourg", latitude: 49.815273, longitude: 6.129583 },
  { name: "Madagascar", latitude: -18.766947, longitude: 46.869107 },
  { name: "Malawi", latitude: -13.254308, longitude: 34.301525 },
  { name: "Malaysia", latitude: 4.210484, longitude: 101.975766 },
  { name: "Maldives", latitude: 3.202778, longitude: 73.22068 },
  { name: "Mali", latitude: 17.570692, longitude: -3.996166 },
  { name: "Malta", latitude: 35.937496, longitude: 14.375416 },
  { name: "Marshall Islands", latitude: 7.131474, longitude: 171.184478 },
  { name: "Mauritania", latitude: 21.00789, longitude: -10.940835 },
  { name: "Mauritius", latitude: -20.348404, longitude: 57.552152 },
  { name: "Mexico", latitude: 23.634501, longitude: -102.552784 },
  { name: "Micronesia", latitude: 7.425554, longitude: 150.550812 },
  { name: "Moldova", latitude: 47.411631, longitude: 28.369885 },
  { name: "Monaco", latitude: 43.750298, longitude: 7.412841 },
  { name: "Mongolia", latitude: 46.862496, longitude: 103.846656 },
  { name: "Montenegro", latitude: 42.708678, longitude: 19.37439 },
  { name: "Morocco", latitude: 31.791702, longitude: -7.09262 },
  { name: "Mozambique", latitude: -18.665695, longitude: 35.529562 },
  { name: "Myanmar (Burma)", latitude: 21.913965, longitude: 95.956223 },
  { name: "Namibia", latitude: -22.95764, longitude: 18.49041 },
  { name: "Nauru", latitude: -0.522778, longitude: 166.931503 },
  { name: "Nepal", latitude: 28.394857, longitude: 84.124008 },
  { name: "Netherlands", latitude: 52.132633, longitude: 5.291266 },
  { name: "New Zealand", latitude: -40.900557, longitude: 174.885971 },
  { name: "Nicaragua", latitude: 12.865416, longitude: -85.207229 },
  { name: "Niger", latitude: 17.607789, longitude: 8.081666 },
  { name: "Nigeria", latitude: 9.081999, longitude: 8.675277 },
  { name: "North Macedonia", latitude: 41.608635, longitude: 21.745275 },
  { name: "Norway", latitude: 60.472024, longitude: 8.468946 },
  { name: "Oman", latitude: 21.512583, longitude: 55.923255 },
  { name: "Pakistan", latitude: 30.375321, longitude: 69.345116 },
  { name: "Palau", latitude: 7.51498, longitude: 134.58252 },
  { name: "Panama", latitude: 8.537981, longitude: -80.782127 },
  { name: "Papua New Guinea", latitude: -6.314993, longitude: 143.95555 },
  { name: "Paraguay", latitude: -23.442503, longitude: -58.443832 },
  { name: "Peru", latitude: -9.189967, longitude: -75.015152 },
  { name: "Philippines", latitude: 12.879721, longitude: 121.774017 },
  { name: "Poland", latitude: 51.919438, longitude: 19.145136 },
  { name: "Portugal", latitude: 39.399872, longitude: -8.224454 },
  { name: "Qatar", latitude: 25.354826, longitude: 51.183884 },
  { name: "Romania", latitude: 45.943161, longitude: 24.96676 },
  { name: "Russia", latitude: 61.52401, longitude: 105.318756 },
  { name: "Rwanda", latitude: -1.940278, longitude: 29.873888 },
  { name: "Saint Kitts and Nevis", latitude: 17.357822, longitude: -62.782998 },
  { name: "Saint Lucia", latitude: 13.909444, longitude: -60.978893 },
  { name: "Saint Vincent and the Grenadines", latitude: 12.984305, longitude: -61.287228 },
  { name: "Samoa", latitude: -13.759029, longitude: -172.104629 },
  { name: "San Marino", latitude: 43.94236, longitude: 12.457777 },
  { name: "Sao Tome and Principe", latitude: 0.18636, longitude: 6.613081 },
  { name: "Saudi Arabia", latitude: 23.885942, longitude: 45.079162 },
  { name: "Senegal", latitude: 14.497401, longitude: -14.452362 },
  { name: "Serbia", latitude: 44.016521, longitude: 21.005859 },
  { name: "Seychelles", latitude: -4.679574, longitude: 55.491977 },
  { name: "Sierra Leone", latitude: 8.460555, longitude: -11.779889 },
  { name: "Singapore", latitude: 1.352083, longitude: 103.819836 },
  { name: "Slovakia", latitude: 48.669026, longitude: 19.699024 },
  { name: "Slovenia", latitude: 46.151241, longitude: 14.995463 },
  { name: "Solomon Islands", latitude: -9.64571, longitude: 160.156194 },
  { name: "Somalia", latitude: 5.152149, longitude: 46.199616 },
  { name: "South Africa", latitude: -30.559482, longitude: 22.937506 },
  { name: "South Sudan", latitude: 6.876991, longitude: 31.306978 },
  { name: "Spain", latitude: 40.463667, longitude: -3.74922 },
  { name: "Sri Lanka", latitude: 7.873054, longitude: 80.771797 },
  { name: "Sudan", latitude: 12.862807, longitude: 30.217636 },
  { name: "Suriname", latitude: 3.919305, longitude: -56.027783 },
  { name: "Sweden", latitude: 60.128161, longitude: 18.643501 },
  { name: "Switzerland", latitude: 46.818188, longitude: 8.227512 },
  { name: "Syria", latitude: 34.802075, longitude: 38.996815 },
  { name: "Taiwan", latitude: 23.69781, longitude: 120.960515 },
  { name: "Tajikistan", latitude: 38.861034, longitude: 71.276093 },
  { name: "Tanzania", latitude: -6.369028, longitude: 34.888822 },
  { name: "Thailand", latitude: 15.870032, longitude: 100.992541 },
  { name: "Togo", latitude: 8.619543, longitude: 0.824782 },
  { name: "Tonga", latitude: -21.178986, longitude: -175.198242 },
  { name: "Trinidad and Tobago", latitude: 10.691803, longitude: -61.222503 },
  { name: "Tunisia", latitude: 33.886917, longitude: 9.537499 },
  { name: "Turkey", latitude: 38.963745, longitude: 35.243322 },
  { name: "Turkmenistan", latitude: 38.969719, longitude: 59.556278 },
  { name: "Tuvalu", latitude: -7.109535, longitude: 177.64933 },
  { name: "Uganda", latitude: 1.373333, longitude: 32.290275 },
  { name: "Ukraine", latitude: 48.379433, longitude: 31.16558 },
  { name: "United Arab Emirates", latitude: 23.424076, longitude: 53.847818 },
  { name: "United Kingdom", latitude: 55.378051, longitude: -3.435973 },
  { name: "United States", latitude: 37.09024, longitude: -95.712891 },
  { name: "Uruguay", latitude: -32.522779, longitude: -55.765835 },
  { name: "Uzbekistan", latitude: 41.377491, longitude: 64.585262 },
  { name: "Vanuatu", latitude: -15.376706, longitude: 166.959158 },
  { name: "Vatican City", latitude: 41.902916, longitude: 12.453389 },
  { name: "Venezuela", latitude: 6.42375, longitude: -66.58973 },
  { name: "Vietnam", latitude: 14.058324, longitude: 108.277199 },
  { name: "Yemen", latitude: 15.552727, longitude: 48.516388 },
  { name: "Zambia", latitude: -13.133897, longitude: 27.849332 },
  { name: "Zimbabwe", latitude: -19.015438, longitude: 29.154857 }
];

export function SettingsPage({ 
  onSettingsChange, 
  defaultLogo, 
  currentLogo, 
  currentTitle, 
  currentTimeFormat,
  currentGoogleMapsApiKey 
}: SettingsPageProps) {
  const [activeSection, setActiveSection] = useState<SettingSection>("general")
  const [logo, setLogo] = useState<File | null>(null)
  const [logoPreview, setLogoPreview] = useState(currentLogo)
  const [generalSettings, setGeneralSettings] = useState({
    footerText: "All rights reserved",
    googleAnalytics: "",
    timezone: "UTC",
    dashboardTitle: currentTitle,
    dateFormat: "MM/DD/YYYY",
    timeFormat: currentTimeFormat,
    emailConfirmation: "yes",
    googleMapsApiKey: currentGoogleMapsApiKey,
    country: "",
  })

  const mapRef = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<google.maps.Map | null>(null)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    onSettingsChange(
      logoPreview, 
      generalSettings.dashboardTitle, 
      generalSettings.timeFormat,
      generalSettings.googleMapsApiKey
    )
  }, [logoPreview, generalSettings.dashboardTitle, generalSettings.timeFormat, generalSettings.googleMapsApiKey, onSettingsChange])

  useEffect(() => {
    if (window.google && window.google.maps && mapRef.current && !map) {
      const newMap = new window.google.maps.Map(mapRef.current, {
        center: { lat: 0, lng: 0 },
        zoom: 2,
      })
      setMap(newMap)
    }
  }, [map])

  const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0]
      setLogo(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target && typeof e.target.result === 'string') {
          setLogoPreview(e.target.result)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleResetLogo = () => {
    setLogo(null)
    setLogoPreview(defaultLogo)
  }

  const handleGeneralSettingChange = (key: string, value: string) => {
    setGeneralSettings(prev => ({ ...prev, [key]: value }))
  }

  const loadGoogleMaps = () => {
    const script = document.createElement('script')
    script.src = `https://maps.googleapis.com/maps/api/js?key=${generalSettings.googleMapsApiKey}&libraries=places`
    script.async = true
    script.defer = true
    script.onload = () => {
      if (mapRef.current) {
        const newMap = new window.google.maps.Map(mapRef.current, {
          center: { lat: 0, lng: 0 },
          zoom: 2,
        })
        setMap(newMap)
      }
    }
    document.head.appendChild(script)
  }

  const updateMapLocation = (latitude: number, longitude: number) => {
    if (map) {
      map.setCenter({ lat: latitude, lng: longitude })
      map.setZoom(5) // Adjust zoom level as needed
    }
  }

  const handleCountryChange = (value: string) => {
    setGeneralSettings(prev => ({ ...prev, country: value }))
    const selectedCountry = allCountries.find(country => country.name === value)
    if (selectedCountry) {
      updateMapLocation(selectedCountry.latitude, selectedCountry.longitude)
    }
  }

  const filteredCountries = useMemo(() => {
    return allCountries.filter(country => 
      country.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [searchTerm])

  const renderSettingContent = () => {
    switch (activeSection) {
      case "general":
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Logo Settings</h3>
              <div className="mb-4">
                <Label htmlFor="logo-upload">Upload Logo</Label>
                <Input id="logo-upload" type="file" onChange={handleLogoChange} accept="image/*" />
              </div>
              <div className="mt-4">
                <h4 className="text-sm font-medium mb-2">Current Logo:</h4>
                <Image src={logoPreview} alt="Logo Preview" width={150} height={50} />
              </div>
              <Button onClick={handleResetLogo} variant="outline" className="mt-2">
                Reset to Default Logo
              </Button>
            </div>
            <div>
              <Label htmlFor="footer-text">Footer Text</Label>
              <Input
                id="footer-text"
                value={generalSettings.footerText}
                onChange={(e) => handleGeneralSettingChange('footerText', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="google-analytics">Google Analytics Code</Label>
              <Input
                id="google-analytics"
                value={generalSettings.googleAnalytics}
                onChange={(e) => handleGeneralSettingChange('googleAnalytics', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="timezone">Timezone</Label>
              <Select
                value={generalSettings.timezone}
                onValueChange={(value) => handleGeneralSettingChange('timezone', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select timezone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="UTC">UTC</SelectItem>
                  <SelectItem value="EST">EST</SelectItem>
                  <SelectItem value="PST">PST</SelectItem>
                  {/* Add more timezones as needed */}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="dashboard-title">Dashboard Title</Label>
              <Input
                id="dashboard-title"
                value={generalSettings.dashboardTitle}
                onChange={(e) => handleGeneralSettingChange('dashboardTitle', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="date-format">Date Format</Label>
              <Input
                id="date-format"
                value={generalSettings.dateFormat}
                onChange={(e) => handleGeneralSettingChange('dateFormat', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="time-format">Time Format</Label>
              <Select
                value={generalSettings.timeFormat}
                onValueChange={(value) => handleGeneralSettingChange('timeFormat', value)}
              >
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Select time format" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="12">12 Hour (04:40 PM)</SelectItem>
                  <SelectItem value="24">24 Hour (16:40)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="email-confirmation">Required Email Confirmation for New Users</Label>
              <Select
                value={generalSettings.emailConfirmation}
                onValueChange={(value) => handleGeneralSettingChange('emailConfirmation', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">Yes</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="country">Country</Label>
              <Select
                value={generalSettings.country}
                onValueChange={handleCountryChange}
              >
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Select or search for a country" />
                </SelectTrigger>
                <SelectContent className="bg-white max-h-[300px]">
                  <div className="px-3 py-2 sticky top-0 bg-white">
                    <Input
                      placeholder="Search countries..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <div className="max-h-[200px] overflow-y-auto">
                    {filteredCountries.map((country) => (
                      <SelectItem key={country.name} value={country.name}>
                        {country.name}
                      </SelectItem>
                    ))}
                  </div>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="google-maps-api-key">Google Maps API Key</Label>
              <Input
                id="google-maps-api-key"
                value={generalSettings.googleMapsApiKey}
                onChange={(e) => handleGeneralSettingChange('googleMapsApiKey', e.target.value)}
              />
              <p className="text-sm text-gray-500 mt-1">
                This key will be used for both Google Maps JavaScript API and Google Places API.{' '}
                <a 
                  href="https://console.cloud.google.com/google/maps-apis/overview" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  Get your API key here
                </a>.
              </p>
              <Button onClick={loadGoogleMaps} className="mt-2">
                Load Google Maps
              </Button>
            </div>
            <div>
              <Label>Google Map Preview</Label>
              <div ref={mapRef} style={{ width: '100%', height: '400px' }}></div>
            </div>
          </div>
        )
      case "security":
        return <div>Security Settings Content</div>
      case "notifications":
        return <div>Notification Settings Content</div>
      case "privacy":
        return <div>Privacy Settings Content</div>
      default:
        return <div>Select a setting from the sidebar</div>
    }
  }

  return (
    <>
      <div className="flex h-full">
        {/* Sidebar */}
        <div className="w-64 bg-white p-4 shadow-md">
          <h2 className="text-lg font-semibold mb-4">Settings</h2>
          <div className="space-y-2">
            <Button
              variant={activeSection === "general" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveSection("general")}
            >
              General
            </Button>
            <Button
              variant={activeSection === "security" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveSection("security")}
            >
              Security
            </Button>
            <Button
              variant={activeSection === "notifications" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveSection("notifications")}
            >
              Notifications
            </Button>
            <Button
              variant={activeSection === "privacy" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveSection("privacy")}
            >
              Privacy
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          <Card>
            <CardHeader>
              <CardTitle>{activeSection.charAt(0).toUpperCase() + activeSection.slice(1)} Settings</CardTitle>
            </CardHeader>
            <CardContent>
              {renderSettingContent()}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}