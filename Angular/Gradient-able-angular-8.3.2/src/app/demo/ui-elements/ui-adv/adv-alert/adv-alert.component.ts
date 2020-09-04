import { Component, OnInit } from '@angular/core';
import 'sweetalert2/src/sweetalert2.scss';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-adv-alert',
  templateUrl: './adv-alert.component.html',
  styleUrls: ['./adv-alert.component.scss']
})
export class AdvAlertComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  basicSwal() {
    Swal.fire('', 'Hello world!');
  }

  successSwal() {
    Swal.fire('Good job!', 'You clicked the button!', 'success');
  }

  warningSwal() {
    Swal.fire('Good job!', 'You clicked the button!', 'warning');
  }

  dangerSwal() {
    Swal.fire('Good job!', 'You clicked the button!', 'error');
  }

  infoSwal() {
    Swal.fire('Good job!', 'You clicked the button!', 'info');
  }

  confirmAlert() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this imaginary file!',
      type: 'warning',
      showCloseButton: true,
      showCancelButton: true
    }).then((willDelete) => {
        if (willDelete.dismiss) {
          Swal.fire('', 'Your imaginary file is safe!', 'error');
        } else {
          Swal.fire('', 'Poof! Your imaginary file has been deleted!', 'success');
        }
      });
  }

  promptAlert() {
    Swal.fire({
      text: 'Write something here:',
      input: 'text',
    }).then((result) => {
      if (result.value) {
        Swal.fire('', `You typed: ${result.value}`);
      }
    });
  }

  ajaxAlert() {
    Swal.fire({
      text: 'Submit your Github username',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Look up',
      showLoaderOnConfirm: true,
      preConfirm: (login) => {
        return fetch(`//api.github.com/users/${login}`)
          .then(response => {
            if (!response.ok) {
              throw new Error(response.statusText);
            }
            return response.json();
          })
          .catch(error => {
            Swal.showValidationMessage(
              `Request failed: ${error}`
            );
          });
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.value) {
        Swal.fire({
          title: `${result.value.login}'s avatar`,
          imageUrl: result.value.avatar_url
        });
      }
    });
  }
}
