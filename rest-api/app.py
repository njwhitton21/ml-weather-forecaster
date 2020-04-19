from flask import Flask, request
from flask_restful import Resource, Api, reqparse
from weather_api import get_hourly_data
from weather_api import get_current_data
from flask_cors import CORS
from machine_learning import predict_hourly_weather
#from flask_jwt import JWT, jwt_required

app = Flask(__name__)
api = Api(app)
CORS(app)

class CurrentWeather(Resource):
    
    def get(self):
        
        response = {
            'twelveHourForecast': predict_hourly_weather(get_hourly_data(43.1163, -75.4037)),
            'currentWeather': get_current_data(43.1163, -75.4037)
        }

        return response
        
class CurrentWeatherSpecified(Resource):

    def get(self, location):
        return {'message': location}

class WeatherForecast(Resource):

    def get(self):
        pass

class WeatherForecastSpecified(Resource):

    def get(self, location):
        pass

class HourlyWeatherForecast(Resource):

    def get(self):
        pass

class HourlyWeatherForecastSpecified(Resource):

    def get(self, location):    
        pass

class DailyWeatherForecast(Resource):

    def get(self):
        pass

class DailyWeatherForecastSpecified(Resource):

    def get(self, location):
        pass

api.add_resource(CurrentWeather, '/weather')
api.add_resource(CurrentWeatherSpecified, '/weather/<string:location>')
api.add_resource(WeatherForecast, '/weather/forecast')
api.add_resource(WeatherForecastSpecified, '/weather/forecast/<string:location>')
api.add_resource(HourlyWeatherForecast, '/weather/forecast/hourly')
api.add_resource(HourlyWeatherForecastSpecified, '/weather/forecast/hourly/<string:location>')
api.add_resource(DailyWeatherForecast, '/weather/forecast/daily')
api.add_resource(DailyWeatherForecastSpecified, '/weather/forecast/daily/<string:location>')

app.run(host='0.0.0.0', port=5001, debug=True)