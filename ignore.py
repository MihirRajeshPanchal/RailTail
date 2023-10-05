import cv2
from ultralytics import YOLO
import json

def apply_machine_learning_model(model_path,frame):
    model = YOLO(model_path)
    results=model(frame)
    height, width, _ = (cv2.imread(frame)).shape
    l=[]
    for result in results:
        l.append(result.tojson())
        
    # Your list of dictionaries as a string within a list
    data_str = l 
    # Parse the string into a Python list
    data_list = json.loads(data_str[0])
    # Save the list to a JSON file
    with open('output.json', 'w') as json_file:
        json.dump(data_list, json_file, indent=4)
    # Optionally, you can print the saved JSON data
    with open('output.json', 'r') as json_file:
        saved_data = json.load(json_file)
        print(saved_data)

    def calculate_cleanliness_percentage(data):
        total_objects = len(data)  # Removed ['predictions'] as it's not a dictionary anymore
        trash_count = 0
        if total_objects>0:
            for prediction in data:
                x1, y1, x2, y2, confidence = (
                    prediction['box']['x1'],
                    prediction['box']['y1'],
                    prediction['box']['x2'],
                    prediction['box']['y2'],
                    prediction['confidence']
                )

                # Calculate dynamic object size based on position
                normalized_area = ((x2 - x1) * (y2 - y1)) / (height * width)  # Assuming frame size is 640 x 640
                trash_count += 1 - normalized_area  # Subtract normalized area from 1

            # Calculate cleanliness percentage
            cleanliness_percentage = (1 - (trash_count / total_objects)) * 100
            return cleanliness_percentage
        else:
            return 100

    # Example usage with saved_data
    cleanliness_percentage = calculate_cleanliness_percentage(saved_data)
    print(f'Cleanliness Percentage: {cleanliness_percentage:.2f}%')
    proc_frame=results[0].plot()
    return proc_frame, cleanliness_percentage

cap=cv2.VideoCapture('garbage4.mp4')
while cap.isOpened():
    ret,frame=cap.read()
    if ret:
        cv2.imwrite('frame.jpg',frame)
        apply_machine_learning_model('server\garbage_detector_1.pt','frame.jpg')
    else:
        break