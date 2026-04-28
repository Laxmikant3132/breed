import React, { useState } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import BreedCard from '../components/ui/BreedCard';
import { Search, SlidersHorizontal, BookMarked, Sparkles } from 'lucide-react';
import type { BreedInfo } from '../types';
import { motion } from 'framer-motion';
import { cn } from '../utils/helpers';

const LearnMorePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<'All' | 'Cattle' | 'Buffalo'>('All');

  const breeds: BreedInfo[] = [
    {
      id: '1',
      name: 'Gir Cattle',
      type: 'Cattle',
      milkProduction: '1500 - 2500 kg/lactation',
      region: 'Gujarat (Saurashtra)',
      strengths: ['Heat Tolerance', 'Disease Resistance', 'High Milk Fat'],
      useCases: ['Commercial Dairy', 'Breeding', 'Drought Power'],
      description: 'Famous for its tolerance to tropical diseases and high heat.',
      image: 'https://images.unsplash.com/photo-1546445317-29f4545e9d53?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      advantages: [], disadvantages: []
    },
    {
      id: '2',
      name: 'Murrah Buffalo',
      type: 'Buffalo',
      milkProduction: '2000 - 3000 kg/lactation',
      region: 'Haryana & Punjab',
      strengths: ['High Fat Content', 'Adaptability', 'Draft Power'],
      useCases: ['Premium Milk Production', 'Ghee Manufacturing'],
      description: 'The most popular buffalo breed in India for dairy.',
      image: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhUTEhMWFhUXGBoVFxgYGRcXFxcXFhcXFxYXGBcYHSggGBolHxcVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGhAQGi0lHSUtLS0tLS0vLS0tLS0tLS0tKy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy0tLS0tL//AABEIALwBDAMBIgACEQEDEQH/xAAcAAACAwEBAQEAAAAAAAAAAAAEBQIDBgEHAAj/xABAEAABAgQEAwYEBAUDAwUBAAABAhEAAwQhBRIxQSJRYQYTMnGBkUKhscEUUtHwByNikuEzQ3IWsvGCg6LC0hX/xAAZAQADAQEBAAAAAAAAAAAAAAAAAQMCBAX/xAApEQACAgIBBAEDBAMAAAAAAAAAAQIRAyESBBMxQSIUUZEyoeHwQnGB/9oADAMBAAIRAxEAPwAnBcKTIGYnPNIZSzysyUjZIYe0MTMikvEbx2xgoqkc7Zf3sc7yKgI+BjdCsIEyJpXFSWiZUBC4hZYTEgmBu+EWomQ+LQuSCUIi5BgQE84mDCo1Yd3kcMyKJIeCU0pJYRnSGQeOgxJVKoFoJlULwrQ6YLMngQOa0QTWUhLgCM/U5kHKrWK44qRLJNxGSsQEfIxAHdoSZrxfRyMym2irxRSIrNJvRrqWZoRDVE20IqEZR0g4zrRwzWzti9BqpgMTTCxM2LU1MYaNjFhETLEZ3Hu1EqlS6zmWfDLT4ldf6R1PzjBVv8TKtR4ESpaXYAgrV7kgfKMvQHrapQipaAI8s/6/qwxBSp9QpKWH9rGHuC9v5c0iXUASlmyVPwKPK/hPnbrAmBrJsUKmkRyZNgdSoohFq6iKjVGKFriomGZsJVVmK1VJ5xD8Ms7GOfgJh0EPQbJfio+NYYFnU602IMUEGHQrYT+Hj408G5YrmERuxUL5stoDWmGMwiKFpBisWSkrBDMisrMGGUIh3IiqkiTiwZK4vTOO0SEtMT7sbQOSEosqE0xaC5aIGUYYYfSuQTGZSSVmoxbdBlBTkJYPGgoKe0UU6ABB8m0cU5WdkY0T/DiOiTFjxVniVmij8OAXhLj+FCZdIZUaBZiieu0UhNxdozKKkqZg5+EzE7P5QwwuiUm6vaHcyaIFUY6HmlJUyEcEYu0dJvHVLtFQimsnMIkVs7OqWBPIRnuzWKTZtTUZ18ICO7SDYAlYKm5lhBVVxoUl2zAh+TixjznFKefJzzDIWnKDnWFpCCNy7gkHkz9IxNNUOLsK7Q1yF1c11gjMeJ7MLAPyGkBz8JzXRcPzt5vGcpkKmla1cLsEjQl72f69Y0uDYdpxqSlVsr2Ba5zbxBsoiyvKJaBckaFWzjmYQYxUpslzpoN+rw+MgqTMSrwuyf3yjI4hS5FEajbyezQWNo9Nw/G1JpaWaZwzplICkFXjTmUFAj82UC53Ajcy5ZVpoY8LwPs9PnI7yWuWEE5VnNxJPIobMVcgHePbKLtAgPJSkKXLSkBKlZFmxs2W54TYOYO6oeRxxOfgcU2DFWphpS4OhN9TGawXtTNnkITTTEK1US4QkDmVBz7PGlkYrLUP9VL6FiNRYxP6qLKPppRDkSByizIBsIXmoBP+rbkCB9BHxqZQ1U56l/rA8yF2WET0yyC5T8oUzqeTmLB2sfPXl1gfHsVQju2ULqY+rAfWM6nGlAqchLnTKwsAm19Dlf1hLM/QPGl5DFz4oWsc4kmgVziUykszR6nxRxbA50wc4p78RGpkFOsUZYvGKo5pTaZcZ8QVMiARHxTGqRhyZJMxos/EmKjLPI+0RKCNjDpMXJou78w4w2fo8KKSQVEMCeUMVSMniUB6xHLx8F8XLyaSlnQxQuMrJr06BQLciIMTikcbizrUjQpmRxS4TDEg2sR//pA7xnix2NzMgaoJOkCJqwd45U4hLlh5kxKR1P0G8FUB2XIeOqpYy+I9ukBWWQHP5lD6JH3PpGYxvtTMWGK1EnUaJ/tFoHMdG9qqyXL8cxA81AfeFVX2gpWLz0N0c/QRgkKWpioNm0fQDmwj78EksNdD66mF3GLijRVXaVJtTJKj+ZYIAHPLr7xk+0eMylS8i5pmqzBSmLixfKBoLt7QDj1UpSxSSbZlJSo6ZlKIAS/5XN4BxbslUSZiJXdklfgLMCzAvyZ/mIlPOuSg3t+jcYatInLrBUZhooABPkk8On7tB+C1isuVQYh7/veAZ2H/AISbKlqUlROZynT8v1B9oHXW5VqY8LvABrDWIksqYCQoWISVpdyMpyuyt/URyppZNRNSiYiblLrJRLUluArSHy8IJYXG/OEdPjq0g5VrSDbhPF0LOAn5wvQsqBT30wgkqKVPlOr7kPqYL0Ma47i6qaciTRK7uXLGYAB1Z1EgmYpXiWwF9szaCGGHdsKuaAmbLExIsVBLLS51C0jh0GoILXBgSr7ET1SpdRJSpaVBQWACVpWhakvl1UkgC4/SNr/C5aKYTTUypmckM8iaokZW2S1uIbeKJ5HKMNKzUWuVmgwqdLqqcJ/ETCkWmjhRMvomYwJyn8yWeNFTYRS5An8PKyiwdCT8yHfrHmFfUmXOM2nBll1EBQykpewUkOHIZxoehj0Ls5iRmyUTCkpCnsfhIJBAO6bWhwjFehzk37L5/ZmjP+0Un+hcxHySpoC/6QpifFOH/uq+7w7XMiozAIr2ov0T5yXsTzexVMcvHPdKgoHvAbpLiykkM/SPkdi6Vv5oXNVfiWpiAS+UBDBg594cfiY7+JhrHFegc2/LBAmIzZYaIkK5RP8ADLMWJiqfR5jrEpmBAAHP8oZnDTzic1eRJ6D5xRZH4TJvHF+UK5eFJGvzg6Rh8tIdh5wCqed7x9Oq1ENtygbk/YJRXhDJVVLAIAc7WgCtxRKEkzAlv3oN4z+L46JXhudv8Ri8XxOY4Wsl9b8uXSJSml4KJNmqxPtItRGQ5EdNfU8/KEtStMxV5l9ySfqTCOpxJked/wDxAgmqWdfWJN2bNDUYUsAKQol+torkCoAstXW6oAkz5yUslReG+BrqFJJUH3Dj5wgBRX1Tt3qh/wCo28+sXprp4Yd9M9zDReGs5IY/UxEU7ND2AEqqnnWcsjlmUHgKqqAm5SSep+ph9OkjTeAqugQRo31hAAUXGeHX5PBk3DZaCCouTz/SJUlOmWkK56CLEJzFLjrfpABTOnpUpRDcIyjowf7wFPmKzgI1282MET5GUrI0N4Ho7zPIE/KExiSjw1TrzWmKYZiQQA7k25sI0f4yoWWmTgsS8xQWOcPkdJW4zC3J+sI6iaULI6xOmqSxPPX1ibhFtNra8GlJrRnKuqWqeqYslSs+vQFm6BorxSUUrL6bRKUh5zc1n2zQZjTKUff/ADGzIvJCgGfM1+sav+FdF3mIyTsgTFqB3AlrTp/yUmMxTpASS949W/gdghIn1ak2P8iX8lTCOngHmDAvIHoE9gbBhEUrgivk3gF4uvBhhqFA2N4sUoM23KF4mR8Z/KCgstXNa3t++cULnwNNWo84hNcjRldfi8uvSElx8+B3y/2E99HDPhcorHwmKFTF8opROzXd50jhmQuRUkaxKbUQuJuwqbVNrAlZXJUlmvA06a4gJ40omHIueFGP4kJbIBuoE+g/fyhgVxke1t5z8pX/ANlQsmohDbFiqrMp+WnnGbxmtK1eUHy5jB/SB6miBD7xzMsKlz3SPaHWBrBUM0Ip0ti0M8GLLY76QIDZop0OCQ92EMJajLBMAgjKB+xHa6YbADRvKGIgcQzNmvvvrHy8SJa2nVoAmTWB5ka8vKA0L3eABscTu5/xBqKoEOYy8+qbUekdl4iybQANJsxMyZkfe3t847iFUUFKRe2vOFuDl1gnn9bwZjCdFcoAGDvL4hrvANKAkqfcN+sRwmd3jhrCC62lylwdR9WgAQYhLDg/v9/pFEpw8MKhIyn5fP8AWFiF25N+/wBYyMUzRknEjm/oY7UqJOsfVIchXp+kVhcDAtwugmT5qJMsOqYoIT5n7DU9BH6ewbC0UlNKp5XhlpZ91HVSj1JJPrHmP8H8AyvWzRcgokg7DRa/Xwjo/OPWUT3hpCBqqWwvfeFwpneHRSDHDIEUUhULKPDCq5sINFCkBmglM9g0VTZ4hNthQtXTZS8Vz1BovqZsLp8yNrYmBTFkG2nI39jqIGVN/pPor9RE6uaIABUdAY2sa9aMOb9m6xSnGVwIClUmd302hjUrBGsTo1ApsImpNIpQtn4eFBmZuUJaqmKN3jWTXjPYwWcGNwkzEkKVKjJdrwc6TzQU+xf7xpzMjOdskvLQeSm9x/iN5V8GZxv5GKmrLeUWd66YmqW7+UDiWQdI4zoBZ6YPo5QUAN9jAc4Xg6lcAF/8QxDGXiWUnNqNoMTWpWoKDga9OsL8VQ6AtLONevnCZE9h1G0Kwo0GITEknLy/bQuE3LACcSOkRmz/ADh2AZWzM0CldtYGM2OrmNCsBtgs3+YH20h3USc6rqs8Z3Dk8YUP3rD8TGCoaAghQkFucdq8UBIAuGHs0K8RrXYNpC38RpAIdzpwy+b/AL+kJayZkBG8cmVRcGF9TOJJPOEM4hRIgimkupI5kD3LRTKGgh72Wou+rJEvbOFH/ijiV8h84APbZYEpKUpYJSAlIGwAYCL5OIjnAeJK4YzsyfeOtQtEJTo3SMTTzEdXjCPzRgPxB5x01EPsi7psZuMo5wMvGExlAsmLkJJh9pIXcZoTVqX4Y4uUAxmLZ7WhVTOLOw3hkUg6eLRzGWqNJ2NKHDaZW4Wep+0MHlJsEhh0hRhlGU3BvEZk8vE2rfkotIbpUnlBEupSzC0J5s3LAU3EOUPhYcqHsytGhhPia0F8xgCf3hVd+kUzJa1qyt7xuMKMOVgdUtIPDpCjH0ZpKuhCvY/5MaafghAcKvCmqoiUKSRqCPcRR1KLRNWpJmGTI3j6okWcawUEEDSFVdVK0Gp2jzzrFtRMZUNKVLpEL5tKDdT+4tDSlIty+toAITcwGsLZsu4tDmopyASAS+n3hTPQdYABJspySIikkaxckPrHTL9YAOLAIfeBll/SLpgIEU07ksxN4AGeE1ACb66e0GzZ7slwPlA06lCEhQF7vAtGMxHnDsQZidEwBSX5wtQUsxd41RkAhmdvWM1ikr+cES/Lpu8MQLOXa0DqQ5EM5NB8SjYH3iKMqlttzgGUS5TXjafwwkfzZs8iyE5B/wAl3PsAP7oyM8hJZ49O7L0Xc0stLMpQzr55l3Y+QYekbxxuRibpDqqmlUB/hRrB0mUCLx1MpuojpuiNWJlyukfIkknSHS0B3CQ0Vzg2kbUzLgV0tMBctFtcU/C0CKMQIhVsLOZ2i6VXMbxQURBUt9o1SFbQ+l4qANYrNejeEolHlEu6PIxjgjfNjmZPJizD5TrBO0CgxZKmkF3hM0PZ84C8UCYl8zQtXPeK5s/YGMKI3ILq6t9IXTFOXjhVESY2lRluzE9okGUtbaEuPJV4ysyjWT3jtybWNn2xlPMQXsU39FGFNTOSASBp+/0jjmqk0dMdozqgSoAmwuTpFk/GwlkoS4GvWHHYnDhUVKlrDoljMx0KlFkvzFlH0EKl4VnBUki5LdQLO8KtWIKocdSWSoEFuVotnqlquCP/ADCmmpzJzKWL6DfzME0eCz50lc+WjgSed1N4sqdwN/vABBVPY/WIS0KaBBUrTrp8veGmHVSVcn6whgawp2MF06e7BNiYMXTlQLsPb7QPPwpav9wfvaGFEZM4KUpJPwn5RPD5ITxbHQ9RaADhsxJYEE9DBtIsiUEK8SSX6OYQDFVQprENGfpVgziVaAH9PvDPPwKO8ZtcxlHmXjQh3WVL2D3Og+0VCmyuTBeF04EtKjdRuSeugHyirEqgANvCGd7N0In1UuWfC5UrqlN29Sw9Y9cAjzv+GMkrqZqwPDLb1Uof/kx6rJoN1e0XxtJEZq2BJTFgTB5p4pUGinIXGikJiubJG0FpmpZiPWIKUnYGCxUhaumO0WSqZX5SfSD5Y32iyXVlJs0NyYlFACpBGqW84EqJbXh+Z6pmukVTpIsGgUhuIgEyLRUEbQ0l04Fmg1NOjkIbmhKDEeaPs0cmSjlLFixbodoqwynWtBvmy2PNw4L+z+sDkk9mS3OHbf8Af6xFS46UJSoLUwACklzsrK//AGx2dLBCfzPmG5yiyiPcj1iM86i6/AUUiY5IAPDqfnce3vEirpBAlsMwPi067P5QAie+Ri4X8iz35OAfaNqfypgZHtDVKVNmEWEtpbetz7n5Rmq+oIDOYfdo6Eoq5hfhmSwr18P2eMzictQ1b03jmn+p2dUf0oe4JW/h8OnzNFTVmWjn4Qn5cZ9IFlT2lhPIQEqYVUMkfCioWD0dOYe7qivvS0OXoUfZCuWSGDk8uZOgj1nBaTuJEuUPgSAeqtVH3Jjz7sjhxnVAmEfy5RzE7FfwJ8/i9Bzj0gKiuGOrJZZboy+P9lVLX3lMEjN40KOVL/mDA+ohdN7Bzn4VylDrmT8spjfI6xYG5xp4oiWSRlcM7EJTedNWo8kHKkepcn5QwHZGnZiZhHVf6CHiSIyGOYkpaignKkOAHIBPnodvKFKMYrwHJscS+ytMLhKvPvF/Ywh7V4FLkywuXmucqgS7WJHXnBmFzlo7zjZpYmtsSAlRAtpkCh7wy7So7yhXNCeHKlaS77g+7RHuQapqn6NRk7PNJc25BhIv/U94Z07qKrQVhUgFMxJSCxCrtuCPt8ow3SKN0MqahUJMtWygN/l59P8AEJMSpiC5Nh7w5qqkyEOh1IDJykuLjZ7+zRnamYqYOjvbqXhhaaPSv4JykBNTNWQHMtA9Asn/ALhHqSjLBYqD+Yjx7+HiiJM1KGzCYDfS6QAS3kY0qpc4/wC4geSCX6F1aRaMLRNzp0a+bWylFSErSVJ1ANxcj6gj0MBrD7PGFpZsxEwrIZCFLQQGNlqK3BZyArKP7oYYn2jWEZZbZlA3cApY3t7wlNJbFys0Kp6Hy5g4szh4tbpHnlDPX3hIZal3uWvvbciNrTVrJSFkZmDtpGoT5Aw1jEUiIidFNRWJQCpRYRQVjBJADv6RbKmAx572g7QrUP5JPduxIsXa4PIF/lEezHaBQV3azw7EuWVtfVoj3It0Oz0TuAbvHVSVbG0KKbFUkAlQCm4vMawdLxEEOLgxTY7RlcMmzCpa1lyVAauEpCQGA01zHTe/KCUYkUqzyylilWZgMpBVmAuWtmdz+ZXOwwCZSUgKBYZVB+IkgMojSyfW5hQMZImS2Q4JdQIBYX3BYEJCQ+vDHhZc8sktMyNa7Eiyyt0LOVXEzEIV3ZPJzwn26xOfOAVJyqI4wTcKKUkF0k7tlW3PSE1RSpWCkTColKihSmKXUnKAQtX9PW4VyhnLkTEscjgJIVq3GkhgGtrf1O8RlN6pjohS1ipi1LC8ubhSSLZEqAtbb7H1lXVAQUvwrKXsxBOZAIKho2YaWYeUDUdAtKg6UhIOYku7Zkp8IuVM783d4NqJKc0lEtaCtISjMbgC2YM7kqf2THQs7jWxUZzttnCpeZ2WksdbAvr66RnplKufMRJQOIg8rMH+0bPtasTDLuTeYWPwhZBYdAQ2+kL+z2HS1zZ5XolKE63a5U3s3rHWs14+bKrUTMYag/haiWdUTpZI3+JB+cVZLXj0LtHQSvw9VOQkAzQFq0d0qSQxG33ePOsmZJD629y0axZVkVoEz0bsjRZaeWkglxnNwCCsgk63bMOWkHU6DmWjOXSrKCXvxNflzeCJEpcpYDFzlsGYgMl+V23NszxMGWZx4coLXtYAggKyP+YByzAaxzfWSjJ0SqwWSFsnMSCpVruPC4HKKJVYpJGYkl2I9eUNUyAkg5ysBTg6gBJbK4sQ3kQNoDVRiZmJUAQ97nNd3Kh9RcRddfDVi4n02oWpEzIQkhyCzgNq8Y0U8xu8UCoO7u5J00HXnGumYcpM5HcrBQAOBy5Lsu3p/wDLpEJdGykTJTpBSeE25kpCvzOw5W0ItGZ9ZGQ6oQYPWpM8hYBzFlXN0L4MuUjko2h9lmCROkK8BQrJY5myLUl72IyzAR5iAe0GEBE5M6QHWVOQQCOIg520tdxD6lCZ0pRAbvCodUBSCTYl2zqWpv6x1jnyZYvaNI83kZUpBG4fzgakqeNZDAcPr4vpf3ijGwuWsoGgKgP7iPtDrBsFSuRxqyqWlK3LMHuE89PqY7ZTSSbKTegOlkGcFIF7Ei9nGh84XCnZNlRp8Po5sriNkksMpOjbtoG2VCivw9as2Q3CibaEQoZOTpGYexl/DwKMyflUBwo1BLl1tooX1jaTjMA0Cj/Scp/tU/1jBdlCJctZLmYVXAISwT4bk31UfWGsrEUhWcKmBT3vmfzYsW6wS6qMPi7JzWxhXrPd5cpdySXGpuXINi5+loUylFYAICVOcpPnp0hgahMwp/nhndQKS7HYKYAA/feBp+HgErSxBu728k877i1jHLLqI8tMVFVDK4wSsaEW6beZAh/Oq0JALkgtlsST/mM4pJJ4Zeez3OXKzCwcXghdYUgCYhm8GbvBc21cPvq8aj1UktIY4GJkqKVr7tIIs/EE9WDBRLBibB94pxSUmYZctE2xBYMS258Om49Dyiikly1kliopsQl1JcOxdSC/sdYc0ybeFYA8TKlrYbBrXduultYnPq5NeWaUUZlOGsVSwM6SxKwXynmUg7OeRMcl4LMlLGYlBB1KcybG10nfyjXS+7zhihzxBJ4PM8Vn0s5OkC1sqeg5iDMQojKhJCVAaO6yL6c9yIkurknTHxBJlEZiCyQlWXZWYBSSClgm4dLi/IQGcVmSWQFIYcz1IP0h/KngDIQZZDqyWyWGuY7l99XMAVEynUQZ6QFturZy33gx9XNN7E4nZlIA7S1kqOpJLgOAwL3YnnvAVQs94WQUf8gWJ+JrG7X6+8aKmpLjMCq2YKzFwGcD8wdhFVXLmqB4Qpz8Zdzls4Cbhjp01jnTV7NcQHDqfKAFrSS+uUggEgkA7gu1tL3MSmTiAcn8wOWBIABc+T777wVNw2dkCRMyncpylTXDJBsNzzv7iS8LWh8yioOxKtdG5gPvvA3q7HxYPKxOoPhAsBwjKQ5JdlgX21066wPORMUQpSeIcRVpZIfUB9HFhfSGycGD+HPl0Ci41N8oHR28hF8jCAriOtrIJAY8nV4doy5bFwkJsRVnSguLBSgBu+XoHhN2f4qicguAtKVW/pJ1va5Tz1gnHJcyXUArSvISbgAJU3hAT0cB9TCXDxMp6rOpJ8KhYEllOSA4Dlrjyj1IRvBxT9FHH4myxenlIpZydVqlqAuSSWPw6/v2xtdhqZUl9ZljYkh9T9hG3m4elNPMnpZWcO4zZgSUjcvo+ul4yiqpM6WtBNgSzWc+fKMdFfF39wjHWx3WYukJYrzbpAssEXDcwOZ1iFDik6acykqRlBKSRwkf1B/vvFvY9MmYhKJhCZ4DJCnIISAOFiAdB1LbtGhmUCSg5CCl2f4Q2ygASbh2NtY4prtyqifbZnayebrlr/lqQEEOGFyoKSHzOLjTdnirDKZmAcqzvmNh8JU2Y7MX+2+kk4cUhmQwABA3I1YW847MpXIOYBBY5UgjmyX11vd9YzLKmqDgxYqYsLGaW6QliXuPEXAfe3vtE8PSopIS55vsbjKWdudzv6QYZMsLIOpDhJLlTtyF2IPv5QVSypKAc2p4bEgMeQDAXA8rmJKVj7ZlsVmAMFrBI5EZha+YaO246+cKxiCswSha0luFy6S1jqVDN+93jQYrgiZq1EKUjkwdIsQGLWH6CAMSwVMtJUkzHAdAIN1EaA7jWOrHx9i4bE2LSAoXYhrOWBbmev3gOlrlIS6LgDL8JACeb7s2ghvL7OVEyXmytb8xKrWfoN4JwCmzF1ynl+CYQCShabMoeIgkXA6R6GZxcPuUlBsEwmskTlZZypoAFwojICDoBlNr+cdVPRnWJb925CMxDkNr1e59RD6dJkycyjIKwbhLO6i7qAbkNzvC7GcCmryLloy3Oa4ZywCUoAdt3JHJo58GWCl9kZhETUMpImELDoJztdjzsGvpqYcKwpKs5AAABFiMoB1sCSeT9Giw9nagoSxRmChyzWOviYDo93i+TQlCv5tMtSiQo5cuUXLsAvw2HLe5hdQ03yjIJY/Zymw5ElBUlllQsEgOABvu2nnyiyspiqQhZXMsbgJbU6KZPDqgbkZB1hhVpySiESypRN2IL3HPU2sOsXnE5y0CWJPTjbOwuFFA1JIf6xyq/IuJn5MrIhby08JCfjKXNwOI8RNi/u0cpcTXJPAiWlJ+JIQUE7cb6M2/pDiunrcFUhKkhLMCzJWnLZOVg9tvkzgicrOpaqYnPlzMUKNhlSQFBhZujhNnAbUYqX6n/fyZ4H0usqFhRUQHSogZUqWzW8LWvp01vE6RdSCmVMWQnhGayVAmzEK56tY2glLhWYSlAsAQqWhQ3KiLEDa9wG0F453qrpS+iiAMqsoWkJWbpJCsoYkHblaDsxXv9v5NUDT6aZNJK1JBa2pLpcJOYMACkEt/Tydpplz0AlKk5crku6FNzljU6D3uIhPmKIVlkzAkghRZKAHRPltpplqZ2pLcOyQIrqqmsJYJDqObNplzl2bTXlDliXp/38hRbLkzFfzMqn2UUgpytZgFg5T1J0j4TSnhK9OTMzW1BbyeBkoq8wPeBRL2IOVTKzEOzCLZ9NUkuFpQPygqt8on2n90LiaWbMCUkBTAcYI1Dlj4gxDk+56RdmfKUq6XAdjr12+nSO1IIdBJUH3CfPlF02hTms4blbUD9YMmFwVlSlUw2BABuXA1yjrtbWA+7UpJDAdS9yX6BtfYCCplOkTGD6h7m9h1ixBdfdlmKeQBG1m00EZ4bBsXUyZwuSkKILMWDWsrXnt9oihE0oBC0pLjQqUOEh29rjyguukJSpmdzu9vJvvHVUwKkBzoS++o/wAxt4mmAEnDzmKs2Z7sop1OrPoPK/nHRQS3BWlOY82KiUs+nkYdokpSklnZQABJI8QDtzuYpyXN9A+2oPleOiPT5EvICxdakAJDpc5RlBAJG9g7fKK6qRKDKXLBWbFwSstdnIvpvDFcvKbKLgpDsn4rk6enKGdRKZGpLIJcsToTe2kOHTy9MDLzl8PeKpyyXADXBTd9TxAEtaCJJVMOVILOxdOZI31TclhoecOZaHGY6hSR0vxH98osqA1hYWPubjytDfSN+xGcRRhwQtyk6JsPIuov8VoJUhRAKXCX1YEKdzcm3P58oaYjLShYISDdNlBxxFtOgA1imSAolwA17WunMA/t84T6OvMgAZjuzDMNNzuFOwYG40iMsrskoDsdQXLXLvppoL2hxMp063uVK1Oymt03aIzqcBKSCoEqYnMroNHbflE/p2l5AXJpFLSFFn1UEnKz87XPufvKrkBSsieEPcKD9HBY7A+92g+kVmXLlnwEAEdCLjyMTmAJ0Ac5nJ1YMw8ossMfACdEsguJgcMALa766i8To5ag4WoPmOz++gfr1845iGILCJ2VhlIYs/w5ru/k8DoW+RRAKil3IchwCWPr8hC7PEYaiYnMyVgiw8SLEEvZ3F/3zuEi6gxU7qLgqLM+gdho3l5vbKpUplkDQLKWZLEImBIe3UwPiM8oVKa4UpQIP9LkaNGvpYf9EUoogEuNA5yh/Itluov1+lo1FCrNmCCVBgrht5AG1rO28GVFAlQBJVcjfTNlNvfd9I+mVSkqQBukBzc3bQ+nzMReGCe1+4C2ciaAE5DmItdIAuwACQWOlzYPFRk1BCvCkh0n4lWYm49fVIhzMpzNQQVrTYHhU2wtd2BYOzPFdFhTzGM6c3/Pydyzl4pHDifgBdSyJxUkqWhSGZLDW9jq726hj1hkicoh8mVrZbXuCCAX/Yi6XSgXcklSbqY87AEMB6RTV1KpbqBdTs6mJa9unpFHh4K/QExIB1TYgEDwkWYvcM2r21j5NGlnSDmszPYAHVfppHxnqCrck224gXDDbW3WJoGYcTl3e55A+vryEUeOH+QyusQoEkJLaFRZQBbQhwLA9YEmyEZQSqWSpvygEnQZr67BotqkOlubG1rkvZtNWiOKUacqtcqBZAYIJLEkhr3jEY45aQHUryuJiAhYuQOLRywCSG9mvF5kzOagGDBxyD7833gKZhUvOtwSAsoAzGwUTvrbaHtXh6UEJSVMAGu2t9vOKRxxsZ//2Q==',
      advantages: [], disadvantages: []
    },
    {
      id: '3',
      name: 'Sahiwal Cattle',
      type: 'Cattle',
      milkProduction: '2000 - 3000 kg/lactation',
      region: 'Punjab & Rajasthan',
      strengths: ['High Milk Yield', 'Ticks Resistance', 'Longevity'],
      useCases: ['Large Scale Dairy', 'Household Milk'],
      description: 'One of the best dairy breeds in India.',
      image: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      advantages: [], disadvantages: []
    },
    {
      id: '4',
      name: 'Red Sindhi',
      type: 'Cattle',
      milkProduction: '1700 - 2200 kg/lactation',
      region: 'Sindh (orig.), across India',
      strengths: ['Hardiness', 'Drought Resistance', 'Consistent Yield'],
      useCases: ['Drought Farming', 'Dairy'],
      description: 'Very hardy and adaptable to different climatic conditions.',
      image: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxISEhUTEhIWFRUXFxcYGBcXFRUYFxUXFhYXFxYXGBgYHSggGholHRUVIjEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGxAQGyslICYvLS0rLS0vKy0vLS4tLy4tLSstLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKy0tLS0tLf/AABEIALUBFwMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAAAAQIEBQYDB//EAEEQAAEDAQQHBAcFCAMAAwAAAAEAAhEDBBIhMQUGQVFhcZETIoGxFTJSocHR8AcjU2JyFBYzQpKy0uFDgvEkosL/xAAaAQACAwEBAAAAAAAAAAAAAAAAAwECBAUG/8QAMxEAAgECBAMFCAICAwAAAAAAAAECAxEEEiFRBTFSExQyQbEVIjM0YYHR8CNxQqEkkeH/2gAMAwEAAhEDEQA/ANrpG3mmQA0GQonpl3sDqUunvWbyPmqtTgcDh6mHjKcbt/3uIxGIqRqNJlmdNO9gdSk9NO9gdSq1Itfs3C9C/wB/kT3qr1Fn6ad7A6lIdNv9hvUqtUHTdsNGz1aoEljCQDv2Kr4dhUr5PUlYms3a5enT7/w29Sk9Pv8AYb1KodEWo1WEkEOa97CCIIunuyN5aQVKuKFw7CyV1H1L95qp2bLT94Hew3qUvp93sN6lVgppbiPZuG6fUjvdTcn1NYy2Ja0SYGJxOcDoU5usDjkxvUrCa66QFJ1EB0OaX1DGYaKbmDqXHor3QdEts9EO9YUmTOc3QqRwGGc3HLy/svLEVFFO5oBp53sN6lPGm3ew3qVVXUoCcuG4Xo9RXequ5ajTTvYHUo9NO9gdSqtCPZuF6PX8kd6rdRaemnewOpR6ad7A6lVaEezcL0ev5DvVbqLT0072B1KPTTvYHUqrQj2bhej1/JHeq3UWnpp3sDqUemnewOpVWhHs3C9Hr+Se9VeotPTTvYHUo9NO9gdSqtCPZuF6PX8h3qr1Fp6ad7A6lHpp3sDqVVoR7NwvQv8Af5DvVbqLT0072B1KT0072B1KrCkR7NwvR6/kO9VeotPTTvYHUo9NO9hvUqsSI9m4Xo9fyT3qr1Fp6ad7A6lHpp3sDqVVoR7NwvR6/kjvVXqLT0272B1KPTbvYHUqrQj2dhej1/JPeqvUaLRttNW9IAiMuKFG0Bk/mPikXmMfTjTxEowVl/4dXDycqabG6e9ZvI+aq1aae9ZvI+aq16bhr/4sP3zOXiku1kIlhCAtuojQW4o2kbD21KpSOAexzZ3SM/BSZUbSdpNOjUqDNrSRzjBUk7Jtl4K7SRitHaftDLQ7tacugMrNHdBfTAaKgw9aAOYPJSrfroRIZTbe2SSY55Sqq12gholxc5wBJOZJEknxlcND2EVKoLsGznswzPJcJ4yolo7I9BDA0/NXZc2XTttjvOpEkSAWYgcgV20lputSoio6002k4BnZguP5hsDeeKiaQFMVqbqVRr5vQWxGGEQitaaFnq0qlR4fdJZBaDDoF4+/B2xLpYuq5q8mNr4OiqbcYq5D0FoKrbbR+02gOFKb3eEGqdjQNjMvBejrnZ67ajQ9jg5pyIOH1wXRd+jGMY6HmqspN66WBCEJ2YXYEQhCjMgysIQiUwvU5gsx6E0PCUORcLAhEoRmQWYIRKJRcLMEJUIuQIhCEXAEIQi4AhCEXAEIQoAuNA5P5j4oRoDJ/MfFC8fxP5qX29EdvCfCRz08e83kfNVcq00/6zOR81Vr0XDvlofvmc7Er+ViyhIpWjqPaOcA4SAP+oO1PxFdUYOb1K0KDqzUUQK5eT2dJt6ochGXOcAsnrboTSVBrqlaqx1AOYHd5hLbxEd0NHQL1SxmhQaZqNDjtJaCTznBZTXS2tqllGQ5rXCpDTIc6CBPKZ5rz0sVVk81R6bbHoaeGppdnSX3fP8AfoYXRrqBd33RIAbPgAJyla+x6Lo0xJaHSIIxILSMQRliFU2/QdOrg9oa4gm83Bzeex3iIVdatIfstnFGHB7MniSyoHO/nbiabgDsMHglWjVXuPXY0typeNabon2my2Zj6jqFEUnOgd3JoGJuB3qzhksnrToww1w9aYgZvBxveBAHirWxWnudtVdDC6GgwHExj3ZMbFC1mtDmCz1jMunDCGlt0skZZEymUoTUrt6iq06bp5YrQutStIGhTNCu1zMQWl2Qkbd2Wa2gO7/3lC87oWirXp0qzrt0h+AmSQ9xJ4ZJBXfF1tR4b7IeQNg+a20eIOn7s0ZK3C41bTpvnubm3aVpUcHux9kYu6DLxVXW1qaDDaTzxJA9yp6FJnq5xnPvXKpWZegJU+J1ZP3dDRDhFCC9+7NLo/WSjUcGE9m4mAHZE7pylXK8qt9M55fWxbvVTSnbWdt4zUb3Xb8MA4jiIW7B4p1fdnzObj8FGl70ORdpE0lLK6JyxQhJCUIBjrySUiEWIUhUiEjnAZmOeCNFzBXYqFDr6Ws7PWrMH/YHylMpaas7sBVHvHmEt1qa5yReOHqy1UX/ANE9C5srNOTgeRC6K8ZKXJlJQlHSSsCEIVioIQhAAhCEAXGgcn+HxQjQOT/D4oXkOJ/NS+3ojtYX4SGae9ZvI+aqlaae9ZvI+aq16Hh3y0P3zObifisEw0mzMCYidsbjvCehbJRUlZiU2ndFJrWLlme9jASC2SGtlrS4BzgSMDG1YZ1ttLqhdZy5zwYvuxc0ZAAeqBzzXpWlbH21GpSDrt9pbMTE7xI81iaOplspVWvp1aJjGSCAOBbEuWDE0XKXuo3YesorWRraVsa51QVIa1sRumASAN2MxsWNtVua9xktc3N8uu4DZgZjZAxTtZ6mkaDZqim9jhBqU2HucDuMZErJV2NaCynIcRLi7AhsSGnnn0XJhg5Qleeh2Z46MoWp6luLV2lQNvXnREiAGtJMgNAgDE7NpT9b6l+lTgGGu9xEDyXPQuj7gbewc8Sd4YPiVqLdY6dWk6jlLZPBzSI95VZTUaqY+NKU6DjybIerbR+xUuHaT4vP+0UrKA4HOTPxPml1WqA2MNccGvc0+Bn4hWLKV9vdIOMCMhwSqjtN3NFD4cf6I7nC4e70UKzNxPxVnVZdaQMcFHs1ORltVE7DnqzjUs4diVHZY3McHsJa4bQSFc06QmJUm1VKVMYiSqqpJPQtKnGStJEKz6yVmQKjW1Bv9V3uwU5utlL+ak8crp+IVZVtDD/IoFrYNggbFtp8QrR0uYKvC8PLWxojrdQ9ip0b/kubtcqQ/wCGp1Z81kXNxTuzTXxCtuJXCsPt/s0rtciZuUPFzvgAoztZ7Scgxv8A1nzVNZGkOKsGsjFKnjaz/wAh1Ph2Hj/ih9fSlqd/yOx3YeShW2lUd6xc7biSfNWVer3WkbPqFytls7gO0BZ+0k+bNPZxirJIzthxeRtla6zaLJEHAgTzB3LLaGYXVgYzd8VsbPbfvi3CBMzw2K9Raiqc2kUVopPpk3SRyJxXWnpm0DDtXD64q90hZsJAlpxmFSVrLuy4Jcako8h7pwqLVF1ovTTy0moQQP5jnicMgrqw25lYEsOLTDm7WniNx2HIrDsrXQWkAg4EHIhTbJUdIq0hdqsGIkltVo/kK34fHzg7Td0czGcMhNXgrP1NpCW6uFjtja1NtRnquE8QdrTxBwXZdxSurnm5Rs7MWEiEK1ypcaByf4fFCNA5P8PiheS4l8zL7eiOxhvhI56e9ZvI+arFZ6e9ZvI+arF6Hhz/AOND98zm4n4rBCEi2XQgVCRCAFleZ6esDadpdTLRN4Fu80ziDxjEeC9MVXprQ7a4DmkMqt9SpEwJxa4bWn3LNiqLqw05mvB4jsZ68jHU7QO0qO2gho4BowHUk+AUxlowzzwy6rMWkVaT3U6oio12I5mZG8HYtBYXBzRwB+A+IXna1Nxep6mhVU1oWDKLGi6xt0FxeY9twxPuCm6PpgNwH8xKgVagbLtgJ9wVhYan3Y3jDLeku71Y9JI4OxJCKVLuQBtUilRGJjeu1nbESqfQYiEGwJxlVtcFxk5rTuYNglc6tka+MIKhE5kZc0zKR9FaSvo9t2QqW00tytcLpla6lOxMFIqwbQk4LpQoQYgpiFtohuoYSM11otJ5K07K6MRE/WKaKN2IG1SRmsc7bZ4p71n6jS5sLW2hzYhxVXSoNpguccGuJ5qUUcjno+yNpBs+scY3BQHVC17nHels9tmqXEzgpVmoX6gkAyri0XNg08HANLYERiBjsw6Kxp0qTsQAmWegyA26MOAXK1/dgnEeCoiX9Ba+jKT3R5jLxTtHaGuOkPBHkqqrpEtxa4zuKn2OoW0i+cXHFUkMjcfYqgpWhzQAKdYkgDZWaJdhsvAHxCvFjLSXG7UE914OHAyPIrZzK73DarnSs/I83xWkoVrrzBKkQuicsuNA5P8AD4oRoHJ/h8ULyXEvmZfb0R2MN8JHPT3rN5HzWd0vbzRaLrbxcfARiSVotPes3kfNZfWEOFJzmAXmjAxJHJd/A37pG37qc7EfGZS6etlYinVvxTLfVGEnhtnmo+itJVL95r5mBdcSb2/xVRpGvVe4Gqb12AC0FsTs3HwVvq72he1rW5E3ifZVZ3zgtIm0ovvNBylPXOmwNEAQNwT1vXIRYEISKbhYy2u2jA806rR3hNM8nd5nQtcP+wWd0VU+7M7MDzvNBXoGl6d6jUjMNLm/qb3h7wstb9Hhrn3cQ+48Ye0JPvC4fElln/Z6LhMs0Lea9GQP2iQ5s8OoHzKudHVxiwnvEgrJ2lxpV3NPD3YfJWIrG9e+pXOnG1jq05ZmzUipgWxkSJ4LtSwMKk0TpHu3X+BnzVpTtrNqXYYTiNwSVrUGmDEpvaCBEQqDT9Yh4O8KqJdjQWiu0iJGW9Vj6InAyqWnWJPdzU1+kBTAwn62q6RTkTWUQHndh1XF77jsBIXAaREEuw4Lm63B+AECMyrpFblnbCCwu4J1ndfYHZf6VcLUC26cQV1pV7gAE55CNqAuSa7BE3gBylU+nKsNuiCDiYTtLWt8REZT3vkqfSFoN0A5/UKUtSsrWItkrQ7Hb81p9GU2g3pkwsfZjiNqvqFXFoGWcJs0KhI2NCoGMl/hxlUv7YaryJhs5HapVtrk0oaJMeaj2GlcGXuSG7D0rlc6m7tMN8T4q6tlsi7SABwkpjLt7HDcq22Vx2pd4KjlcakhtuebrQHXRfJOeIuOgLb2T1Gfpb/aFi7c0di1+y87+wra2Rv3bP0N/tC7HCnozz/GLXVjolQkC7COIXGgcn+HxQjQGT+Y+KF5PiPzMvt6HXw3wkc9Pes3kfNZ7S+k6NnYX1XQMYG1xGwcVdaz2pjHMDjEtPmstpttC00XU3Ogn1XQe67YV28FWisNFX/bmGuv5WzL2rXUVHYWZtwxN494xywXTVyvWqPv0hAkFzYwAJ94US0aCqUnjsHtcLsEuwIwh2Ebdiv9T6Qs1NzajvWIIESWgYQSr9pFvWRDtbQ1aFD9J0956I9J0956J6r090KysmIUL0pT3nokOlae89FPb090GVk4gHDfgqr9hAZSYTNxgZJzIaIx4rt6Xpb1Hfbqed7+ZjQzbLzdEb8fJcrijVSMXF3sdbhM1CbT8zM/aJo1zHsrNaYyPCNvLBU1jtgcF65pax9o2lLZbLr0+y4OH/6C8i01YOwrOujugw4DJpynkRC59KSnHI+aOq24Szrk+Z1p1XB0ZBXLrE91MOGIImVXWOiHQSRB27lci0sosLC+d2fwVXzNUeQmg6jySwmQ3Lik1laSG93GSOIhcNHsODmOB2nDYdhU6mRVc6O8IMY7eJUPTUPoU1GuA0jMpWWljiL2YwiFKtWijTcDPEg/DeoNdwBJO3NSrMo7ol1WYYCZ2f8AqlWKzNMmOG3DliodC3tbmPenO0rTBkSN8EGVazIurFnSsbb2I8Z81x0i5rQYLBwvEz/Sq606ZY4R2jgP0zPvVVaLaCTdJjjAU5WVzIkWu1YzPgGwB1VRaa5J3lFe0BcKbgTgnwjbViKlS+iJljoEwr61aOqdm19PF7MY9obRzRq9YL3fcO6OpO4LQudiWgmY2DLms86rUjTCknGxnNGWpzpLi4cD8lcWWvjzVdbWlji6CGzB/Kd54FSGvEAgTxCiVnqgisujO1vcAZjqs7bqxmZU+1ElxOAGe3FUtvryFNOPvFpztG5qqBD7JTna948bi2LMABwHkvNaelAaVKnECnLjG0lW511x9RdbCyjSv9jzuMm6tn/ZtJSrFHXX8gVdpDWis8i4boC2d5ic902eu6v5P8PihUn2baXdaKdW8MWFgnfId8kLzWPkpYiTX09DqYdWpoZr/UAqUpIHcd/cFlP2pntDqFqftBotdUpSJ7jv7gsh6Npez7ymUcuRXM1W2dndtpacnA+K6BRaejqYdIBkcTtUltMJjsKdvIXqm3R9FK1o49UhYOKAEFIfRTTQb9FPFMRtS3R9EouBy/Zmbl0sdFjKjH3RLTIJyE4E8MCUoYNiTswi90TF5Wmb+hamuutzAg+7BZjWfR7Q99VzCWvAButJymb0LtoW0X3GTkQP/qFqdH3KjAHY5+awq6lY9GpLKpLzPBzaBTqVGUjLJlvAHZ4ZINculaD7UtH06FtZUpkRVZ3myJDmmCSBlMtPVZkSMV0mk0pCqM3qtiWy0OZIk4iFMsGnXUad1rZdN48RgAFWXwTjgtK11NrWtq0m3QJF2JM4gvg55YFKnZLVXHO7ejscqmtTbSW9pT7MZA8VGt1A4kODhzx6LjpXQ9Ks0vpOuvGN2QAeHArLttlRktJO4g+StToxnrDT6CamJlT92or/AFRY2msRHkmG2jn81ANZrs8D1SPszv5SHclqVJeZkdd/4kw27dC4vtZKiPa4ZhNlXVNIW8RJ8yU0yrzReiye86GtGbiQAOqz9Kvd2SeKu9V7ObTaG9q4ljO8W74OAjr4BLqxdtkMo1Upcrs9N1V1fq2qmOyEUtlR0ta7fcGb+eXFaxmpzmMLG2gsPClTLZ3kHE870q30VXuNAkxAA5RgrXtwVmjRg1cbPE1bnk+lNFOp1BTtTWtLwWsqAnsq35QT6r9tx3gSqTRdDs6jqThkSANh3L2jSdgpWmm6jWYHsdmNoOwgjEOGYIyXjunLHVsNsFGs8PF29TqbXsBgXoyeMjvgHal1MPlV4Gqhiszyz5ldrVZezcI2gTu8FmadK/Ua3YXALQ6waQFUznsGOHgs9RrXajXbjPzU0b2LYnwuxbv0a1rg0fzAg8k70PT4qbUZL2EZR1mTPuUqDuTe0kjz9TwxX7zKg6FZvKQaGbvKuSkKO1kKsab7MLGKba8bSzychS9QPVrc2eTkLnV3eo2zfR8COGv38Sl+h39yyp+sVp/tA/iUv0O/uCypI2LRS8CMlbxseW8Ulz8xXG9jkei6Bh3EJgvUTs4M3nRuwTp5pC07k0N5qSB45lLd4poEcU4fp96CRQ1AQH8Ci/w8lAHaxWg0nhwbeaYDgMxjg7jCXSlotVP72yOviSCwFsRibxJOGazWlrXeqXRewzgnoANqdRs5AwbEnI7eJlW7BXUmbqOMcKeR/YrtO2u2Wy6aoDQybjCROOZnEuJgYk8lGoG8wb9vNaSoJF0tIwkHDCMPAKiq2a7Uc1uUyOTsfOU+TTjZLkXwdVuo7+ZGqM2LVMs3atberEgAd0sZAw3HzWdpYPBI25LQWRzQ71cYO1Keo3GTlBLK7HKpq4w4io8fpAb5KBa9UAXEtrEfqbJ6g/BaSUgfwQqkl5nMdST5sxFr1YtDBIAePynHoVT9m5pIMg7QcD0XqGKj2qx06n8Rgdzz65wmrEPzIUrHm8HepNn0fXqD7ulUePyscR1AXo9lLKRBpWeytjMmhfceN5zpC0+jdYXPbFR1JhGQl12N4F33YwoninFaRNtKFObtmPK9F6l2ioZqDsmDO963g35qVp2wCw9jWsxIILgSTJcQAZOyCJwXo1q0nTAM1g87qbD5ugLPaVc2uA1zG3A4OAInEA4nrks8a9SU05ctjRUeHpU2ou8tzS6k6x9pRYXvBJGGxxO0FpxB4jCNq2Vj0jTeYkE8DkvE9MOdTpmqxxa+nBBGGZiOWKttV9aGNZ2j5BwMAEuecoaYujjJwVpZo+9HkGGlCsmnoz1e2W8tIY0kyQCYGHAYYnfuWD+2Kx//AB7PaGgDsqpY6MDdqAZj9Tfeqynro99rYBTcQGk3WiSQTgGzsG8ZyuuuWsZrWWpZnUS6pVAuNcIqMAcHBztjRhhMHFWjKWZJrmXlTShmi+RjXWVzzIugGNuH/qiNsXaVnASWNMYbd6doF7qocHEAU4kOMnDh4Zqyq2X9noOvOAc6cjMydhU2ytofGXaRUiyc5l9jWhzYbk6NgIkcMVIKodGntKxdePdbAk7CP9e9XIo/mKo1Y5GMa7TQ6GEhqAJho/mKeyiOagymy+z9wLa0b2eTkI1AZArc2eTkLDV8bN9HwI46+fxKX6Hf3LKCmZ2LWa9/xKX6Xf3LKgQtNLwIy1fGxSElMnanXUXkwUE8kXuSaR4Lk943KQOrngbUhqBcHO4ZJrzOeCAOtSo3eka9vtBQathaZxJ8clw9EgDByvljuBKNGmLxLh3jJjDw9yRhvHO7MYAjAc1Hdooe0fAJXaMwgPIwVtNwJQYWzBBJGGPxVXiHmpmGw0jdenPk7DxXduicyXuKY/RZDXw6ZBOWZA279ismtxlKplkmQqlV1R4gZkDDmr5llAdJPhuVTouyOc6QMB3ieSuAw7oSr+SNnEG7xJHiklR7zuCdLlFjnnZKWmc1yvlJfdKixJ2AO1EcVG7SpJ3cUrXvjGJU5SLHeEE7AuLHPIxhPh22FFiTlpSzGtRewYEgRzBkT0Wi+zvQY/Y6jKgAcS4yYIbgSOGAVGQdyk2bSFanTfTYYa/1v9bpGCm7tYfQq9m22VOk7SaTqFVvdLarQXAwbrvWBjYdy2GuRpGpTfTDQXM70RjBwJ96zDwSMfmlN5wzwAHT5KXd2IVT+NwMxaahs1rfI+7q4ncWuMnoZUrSZNSXHIEAA5nDYNyTW2yzRa8mbro8Hf7AXTRVEWhtInM9w+GIPvPRMqNZVM3YGbknTI2iKtyq0nCTBPAgCPcFq7+5ZrWGx9jWAAgBrT1vCeeAVxTZeaHA5gHPeoklKMZGTFxtUZML/wD1KaqjsvDPzQSlWMpudQHS2rzZ5OQmfZ2e7W5s8nIWGt42b6PgRy1//iUf0u81mHOwWk+0Bw7WiNtx0f1BZXt9gx2b4K1UvAjJW8bHBy6tG9RmEnHKJnDKM0ovCSMR62G7h9bFcVce56aXxmRHHBLaTd8fOf8AS41GNeLroO73T5qQTOoqg7kA48FHbQuxG3oTGA4KaGmAInDmcMemxGhIwgbEBv1KSs0iBgDznPHZwVfbg+MBhPmJ57UIi5OvDfiI9+SUDaqmyEgwTJx9wJ5bFYUrRIOY3ZSVLQXO0plWngcd+/ckFcGIM/XknOF+W795gddigmL1RN0WGNoVGNzDDiZE4R5qE1khSKDmtBbhiJO3AH/S590iRl47YVVzNmNqRm428kMa3ah4G0ojzj4SnNE4DwwzhWMWgwTlKc1+P+kWsAAY+A4lKWgEjEgHAgZ/RQTcA5NaJxzSX47piT9eCb20Axsxjh/pBFzrKaH70NM85y4RPkg1R8oQGYO0KcJ6JLvdvXgMY8j8Ux9SMdk55KAzDyevNLIUOtUMXmmDOGHmPrNcqVmIPaYx1zzz9ymxNznrOP8A4z43tgR+YLjqkyGxtaQRukB0j3gKytdmD2C9iZBAyGGR+tyXRtlFJrYy2EYOjid5OfJWlL+PKasLVVOd2M19oHt6b4gOphpHHEgc8fcmaGqzSAgS0lvxHuKtNPffABxk3AJgDL1SIzVZomiWAh3gcdxwjw96Iy/iUX5FMRUzzbJjnEc+ATS3f8U8uGO8fHcgHbwy2qtzObH7PB3a3Nnk5Cd9nvq1ebPJyRYavjZ0KPgRobfoihXc11WmHOaCGkkiAcxgVDOqdiknsGydt5/+SEKilJeZdwi+aOx1dsv4Q/qf80wasWT8EZAes/IZbUiFOeW4ZI7DhqzZJnsRP6n/AOSaNVrGP+BvV/8AkhCM8twyR2B2q9jOdAdXxuyldP3dsv4I6u+aEIzy3DJHYadWbIf+BuHF3zR+7NkmexGz+Z+zxSIRnluHZx2G/upYvwG7Nr9kHfwCQap2IGRQE/qf/lxKEIzy3Ds47CjVWxjHsG9X7c9qcNWbJ+C3dm/LqhCM8twyR2E/daxyT2Ak5mX/ADTjqzZPwW9XfNIhGeW4dnHYR+q1jIg0B/U//JKNWLJh9yMPzP8A8kiEZ5bh2cdhztWrIc6LT4u+aQas2SAOxGGWL/mhCM8twyR2H/u5ZfwR1d81zdqvYziaA/qf/khCM8tw7OOw792rJn2I6v8Amg6tWT8EY8X/ADQhGeW5HZw2Qp1bssAdiIGyXbfFNOrFkw+5GGXef/kkQjPLcOzjsgGq9jH/AAD+p/zSu1Yshzoj+p+3/skQjPLcns47CjVmyYDsGwMM3/NKdWrJ+COrvmhCM8tw7OOwjtWLITJoCeb/AJpRq1ZPwR/U/wDyQhGeW4ZI7CfuxZJnsRPN/wA0793LL+COrvmhCM8twyR2Jdi0fSogimwNnEwTjnvPEpUIVW7lkrcj/9k=',
      advantages: [], disadvantages: []
    },
    {
      id: '5',
      name: 'Jaffrabadi Buffalo',
      type: 'Buffalo',
      milkProduction: '1800 - 2500 kg/lactation',
      region: 'Gujarat (Saurashtra)',
      strengths: ['Heavy Body', 'High Fat %', 'Heat Tolerance'],
      useCases: ['Industrial Dairy', 'Ghee'],
      description: 'Known for being one of the largest buffalo breeds.',
      image: 'https://images.unsplash.com/photo-1546445317-29f4545e9d53?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      advantages: [], disadvantages: []
    },
    {
      id: '6',
      name: 'Tharparkar',
      type: 'Cattle',
      milkProduction: '1800 - 2200 kg/lactation',
      region: 'Rajasthan (Thar Desert)',
      strengths: ['Arid Survival', 'Low Maintenance', 'Dual Purpose'],
      useCases: ['Desert Farming', 'Low Input Dairy'],
      description: 'Excellent dual-purpose breed for arid regions.',
      image: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      advantages: [], disadvantages: []
    }
  ];

  const filteredBreeds = breeds.filter(breed => {
    const matchesSearch = breed.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === 'All' || breed.type === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors">
      <Navbar />

      <main className="pt-32 pb-24">
        {/* Header Section */}
        <div className="section-padding mb-12">
          <div className="bg-soft-green p-12 rounded-[3rem] border border-primary-100 dark:border-primary-900/30 relative overflow-hidden">
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 rounded-full text-white text-xs font-bold uppercase tracking-widest mb-6">
                <BookMarked className="h-4 w-4" />
                Knowledge Base
              </div>
              <h1 className="text-4xl md:text-6xl font-black mb-6 dark:text-white">Breed Catalog</h1>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
                Discover the diverse world of Indian cattle and buffalo breeds. Learn about their origins, production capabilities, and unique characteristics.
              </p>
            </div>
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-200/20 rounded-full blur-3xl -mr-20 -mt-20" />
            <div className="absolute bottom-0 left-1/2 w-40 h-40 bg-secondary-200/20 rounded-full blur-3xl" />
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="section-padding mb-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 p-6 bg-white dark:bg-slate-900 rounded-3xl shadow-premium border border-slate-100 dark:border-slate-800">
            <div className="relative w-full lg:w-1/2">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search breeds (e.g. Gir, Murrah, Sahiwal)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-all"
              />
            </div>

            <div className="flex items-center gap-3 w-full lg:w-auto">
              <div className="flex bg-slate-50 dark:bg-slate-800/50 p-1 rounded-2xl border border-slate-100 dark:border-slate-700 w-full lg:w-auto">
                {['All', 'Cattle', 'Buffalo'].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter as any)}
                    className={cn(
                      "px-6 py-2.5 rounded-xl text-sm font-bold transition-all flex-1 lg:flex-none",
                      activeFilter === filter
                        ? "bg-white dark:bg-slate-700 text-primary-600 shadow-sm"
                        : "text-slate-500 hover:text-slate-700"
                    )}
                  >
                    {filter}
                  </button>
                ))}
              </div>
              <button className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700 text-slate-500 hover:text-primary-600 transition-colors">
                <SlidersHorizontal className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Results Grid */}
        <div className="section-padding">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold dark:text-white flex items-center gap-2">
              {filteredBreeds.length} Breeds Found
              {searchTerm && <span className="text-slate-400 font-normal text-sm italic">for "{searchTerm}"</span>}
            </h2>
            <div className="flex items-center gap-2 text-xs font-bold text-primary-600 bg-primary-50 dark:bg-primary-900/20 px-3 py-1.5 rounded-lg border border-primary-100 dark:border-primary-800">
              <Sparkles className="h-3 w-3" />
              AI Verified Data
            </div>
          </div>

          {filteredBreeds.length > 0 ? (
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredBreeds.map((breed) => (
                <BreedCard key={breed.id} breed={breed} />
              ))}
            </motion.div>
          ) : (
            <div className="py-20 text-center">
              <div className="w-20 h-20 bg-slate-100 dark:bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="h-10 w-10 text-slate-300" />
              </div>
              <h3 className="text-2xl font-bold dark:text-white mb-2">No breeds found</h3>
              <p className="text-slate-500 dark:text-slate-400">Try adjusting your search or filters to find what you're looking for.</p>
              <button
                onClick={() => { setSearchTerm(''); setActiveFilter('All'); }}
                className="mt-8 text-primary-600 font-bold hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LearnMorePage;
